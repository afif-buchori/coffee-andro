import React from 'react';
import {
  NativeBaseProvider,
  useToast,
  Center,
  Button,
  View,
  Flex,
} from 'native-base';

const Profile = () => {
  const toast = useToast();
  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <Center>
          <Button
            onPress={() =>
              toast.show({
                title: 'Hello world', // Judul toast (opsional)
                description: 'This is a toast message', // Deskripsi toast
                duration: 3000, // Durasi tampilan toast dalam milidetik (opsional, default: 5000)
              })
            }>
            Show Toast
          </Button>
        </Center>
      </View>
    </NativeBaseProvider>
  );
};

export default Profile;
