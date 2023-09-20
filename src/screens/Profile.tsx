import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import defaulUserPhotoImg from '@assets/userPhotoDefault.png';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').nullable().transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((confirmepassword) => !!confirmepassword ? confirmepassword : null)
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema.nullable()
          .required('Informe a confirmação da senha.')
          .transform((confirmepassword) => !!confirmepassword ? confirmepassword : null)
          .oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
    })
});

const PHOTO_SIZE = 33;

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema)
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data)

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Ocorreu um erro ao atualizar o perfil.';

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  //Acesso a galeria de fotos
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 0.5) {
          return toast.show({
            title: "A imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        const fileExtension = photoSelected.assets[0].uri.split('.').pop();
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile);

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;
        updateUserProfile(userUpdated);

        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500'
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader
        title="Perfil"
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.400"
              endColor="gray.500"
            />
            :
            <UserPhoto
              size={PHOTO_SIZE}
              source={
                user.avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
                : defaulUserPhotoImg}
              alt="Foto de perfil"
            />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input
                placeholder="E-mail"
                bg="gray.600"
                isReadOnly
                isDisabled
                value={value}
              />
            )}
          />

          <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" ml={2} mt={6}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha atual"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirmar nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Salvar alterações"
            mt={6}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />

        </Center>
      </ScrollView>
    </VStack >
  )
}