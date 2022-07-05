import React, { useState } from 'react'
import {
  Grid,
  GridItem,
  Box,
  Image,
  Input,
  Stack,
  Button,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react'
import '../style/my.css'
import { useNavigate } from 'react-router-dom'
import intetraLogo from '../res/intetra-logo.svg'
import loginPagePhoto from '../res/img.jpg'
// import {auth} from "../firebase-config.js";
// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toast = useToast()
  const navigate = useNavigate()
  //const [user, setUser] = useState({});

  // onAuthStateChanged(auth,(currentUser) => {
  //   setUser(currentUser);
  // });

  const login = async () => {
    try {
      if (email === 'admin' && password === 'admin') {
        console.log('basarili')
        navigate('/equipments')
      } else {
        toast({
          title: 'Giriş yapılamadı.',
          description: 'Kullanıcı adı veya şifre hatalı.',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
      // const user = await signInWithEmailAndPassword(
      //   auth, email, password
      // )
      // console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Grid templateColumns='repeat(7, 1fr)'>
      <GridItem colSpan={2} w='100%' h='100vh' bg='black'>
        <Box>
          <Image className='image' src={intetraLogo} boxSize='100px' />
          <h1 className='header'>AKILLI ULAŞIM SİSTEMLERİ</h1>

          <Stack className='stack' spacing={3}>
            <Input
              focusBorderColor='#FDDA0D'
              placeholder='Kullanıcı adı'
              bgColor='#1F2022'
              border={false}
              textColor='white'
              onChange={event => {
                setEmail(event.target.value)
              }}
            />
            <Input
              focusBorderColor='#FDDA0D'
              placeholder='Şifre'
              bgColor='#1F2022'
              border={false}
              textColor='white'
              type={'password'}
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
          </Stack>

          <Flex width='80%' marginLeft={10} marginTop={5}>
            <Button variant='ghost' color='#696969'>
              AYARLAR
            </Button>
            <Spacer />
            <Button variant='ghost' color='white' onClick={login}>
              GİRİŞ
            </Button>
          </Flex>

          <h1 className='intetra'>INTETRA</h1>
        </Box>
      </GridItem>
      <GridItem colSpan={5} w='100%'>
        <Image h='100vh' src={loginPagePhoto} />
      </GridItem>
    </Grid>
  )
}

export default Login
