<script setup>
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { object, string, ref } from 'yup'

// Validation Schema
const validationSchema = object({
  firstname: string().min(3, 'Must be at least 3 characters').required('First name is required'),
  lastname: string().min(3, 'Must be at least 3 characters').required('Last name is required'),
  email: string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Please enter a valid email address'
    ),
  phone: string()
    .matches(/^\d{6,}$/, 'Please enter a valid phone number with at least 6 digits')
    .required('Phone number is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=-])[A-Za-z\d@$!%*?&=-]/,
      'Password is weak, include uppercases, number, and symbol'
    ),
  confirmPassword: string()
    .required('Confirm Password is required')
    .oneOf([ref('password')], 'Passwords must match')
})

// Form Initialization
const { setFieldValue, handleSubmit, values, errors, setValues } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }
})

// declare reactive variables for each form field
const { value: firstname } = useField('firstname')
const { value: lastname } = useField('lastname')
const { value: email } = useField('email')
const { value: phone } = useField('phone')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

// For lazy validation
const handleChange = (fieldName, event) => {
  setFieldValue(fieldName, event.target.value, true)
}

const router = useRouter()

const submit = handleSubmit(() => {
  // Check for validation errors
  if (Object.keys(errors.value).length === 0) {
    console.log('submit', values)
    console.log('errors', errors.value)
    setValues({ password: '' })

    router.push({
      name: 'home'
    })
  }
})

// New function to handle profile picture change
const handleProfilePictureChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      setFieldValue('profilePicture', reader.result)
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="signup-container m-auto translate-y-2 px-6 py-2 rounded-lg bg-white shadow-lg">
    <h3 class="text-darkBlue text-[35px] font-bold text-center">Sign up</h3>

    <form @submit.prevent="submit">
      <fieldset>
        <InputComponent
          type="text"
          label="First Name"
          :modelValue="firstname"
          :error="errors.firstname"
          @change="($event) => handleChange('firstname', $event)"
        />
        <InputComponent
          type="text"
          label="Last Name"
          :modelValue="lastname"
          :error="errors.lastname"
          @change="($event) => handleChange('lastname', $event)"
        />
      </fieldset>

      <fieldset>
        <InputComponent
          type="text"
          label="Email"
          :modelValue="email"
          :error="errors.email"
          @change="($event) => handleChange('email', $event)"
        />
      </fieldset>
      <fieldset>
        <InputComponent
          type="text"
          label="Phone Number"
          :modelValue="phone"
          :error="errors.phone"
          @change="($event) => handleChange('phone', $event)"
        />
      </fieldset>

      <fieldset>
        <InputComponent
          type="file"
          label="Profile Picture"
          @change="handleProfilePictureChange"
          accept="image/*"
        />
      </fieldset>

      <fieldset>
        <InputComponent
          type="password"
          label="Password"
          :modelValue="password"
          :error="errors.password"
          @change="($event) => handleChange('password', $event)"
        />
      </fieldset>

      <fieldset>
        <InputComponent
          type="password"
          label="Confirm password"
          :modelValue="confirmPassword"
          :error="errors.confirmPassword"
          @change="($event) => handleChange('confirmPassword', $event)"
        />
      </fieldset>
      <ButtonComponent type="button" label="Sign up" @click="submit" class="m-auto" />
      <!-- <span
          ><svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#ffffff"
              d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
            /></svg
        ></span> -->
    </form>
  </div>
</template>
<style scoped>
.signup-container {
  width: fit-content;
}
</style>
