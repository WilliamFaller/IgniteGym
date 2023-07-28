import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native';

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object().shape({
  email: yup.string().required('Informe o email.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter no mínimo 6 caracteres.')
})

export function SignIn() {

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignIn({ email, password }: FormDataProps) {
    console.log({ email, password });
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Pessoas Treinando"
          defaultSource={BackgroundImg}
          resizeMode='contain'
          position='absolute'
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
          />

        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}