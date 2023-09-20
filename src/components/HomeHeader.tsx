import { Touchable, TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, Icon } from "native-base";

import defaulUserPhotoImg from '@assets/userPhotoDefault.png';

import { useAuth } from "@hooks/useAuth";

import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";
import { api } from "@services/api";

export function HomeHeader() {
  const { user, signOut } = useAuth();
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
          : defaulUserPhotoImg}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading fontFamily="heading" color="gray.100" fontSize="md">
          {user.name}
        </Heading>

      </VStack>
      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout"
          size={7}
          color="gray.100"
          onPress={signOut}
        />
      </TouchableOpacity>
    </HStack>
  )
}