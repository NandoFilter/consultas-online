const rules = {
  name: [(v: string) => !!v || 'Informe um nome'],

  email: [(v: string) => !!v || 'Informe um e-mail'],

  city: [(v: string) => !!v || 'Informe sua cidade'],

  password: [
    (v: string) => !!v || 'Digite uma senha',
    (v: string) =>
      v.length >= 8 || 'A senha precisa possuir 8 ou mais caractéres',
  ],

  academy: [(v: string) => !!v || 'Informe uma formação'],

  occupation: [(v: string) => !!v || 'Informe uma ocupação'],

  hospital: [(v: string) => !!v || 'Informe um hospital'],
}

export default rules
