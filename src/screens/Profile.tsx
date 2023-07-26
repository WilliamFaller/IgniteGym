import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoad, setPhotoIsLoad] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeader
        title="Perfil"
      />
      <ScrollView contentContainerStyle={{paddingBottom: 36}}>
        <Center mt={6} px={10}>
          {photoIsLoad ?
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
              source={{ uri: 'https://github.com/williamfaller.png' }}
              alt="Foto de perfil"
            />
          }

          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            bg="gray.600"
          />

          <Input
            placeholder="E-mail"
            value="william.faller09@gmail.com"
            bg="gray.600"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" ml={2} mt={6}>
            Alterar senha
          </Heading>

          <Input
            placeholder="Senha atual"
            bg="gray.600"
            secureTextEntry
          />

          <Input
            placeholder="Nova senha"
            secureTextEntry
            bg="gray.600"
          />

          <Input
            placeholder="Confirmar nova senha"
            secureTextEntry
            bg="gray.600"
          />

          <Button 
            title="Salvar alterações"
            mt={6} 
          />

        </Center>
      </ScrollView>
    </VStack >
  )
}