const menuItems = [
  {
    title: "Usuários",
    actions: [
      {
        title: "Cadastrar usuário",
        link: "cadastrar-usuario",
      },
      {
        title: "Gerenciar usuários",
        link: "gerenciar-usuarios",
      },
    ],
    icon: "users",
  },
  {
    title: "Cursos",
    actions: [
      {
        title: "Cadastrar curso",
        link: "cadastrar-curso",
      },
      {
        title: "Gerenciar cursos",
        link: "gerenciar-cursos",
      },
    ],
    icon: "book-open",
  },
  {
    title: "Módulos",
    actions: [
      {
        title: "Cadastrar módulo",
        link: "cadastrar-modulo",
      },
      {
        title: "Gerenciar módulos",
        link: "gerenciar-modulos",
      },
    ],
    icon: "book",
  },
  {
    title: "Tutores",
    actions: [
      {
        title: "Cadastrar tutor",
        link: "cadastrar-tutor",
      },
      {
        title: "Gerenciar tutores",
        link: "gerenciar-tutores",
      },
    ],
    icon: "user-check",
  },
  {
    title: "Videoaulas",
    actions: [
      {
        title: "Cadastrar videoaula",
        link: "cadastrar-videoaula",
      },
      {
        title: "Gerenciar videoaulas",
        link: "gerenciar-videoaulas",
      },
    ],
    icon: "play-circle",
  },
  {
    title: "Certificados",
    actions: [
      {
        title: "Consultar certificados",
        link: "consultar-certificados",
      },
    ],
    icon: "star",
  },
  {
    title: "Outras ações",
    actions: [
      {
        title: "Acompanhar progresso do usuário",
        link: "acompanhar-progresso-do-usuario",
      }
    ],
    icon: "plus-circle",
  },
];

const users = [
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    cpf: "119.342.234-88",
    birthDate: "11/05/1995",
    phone: "(31)985187327",
  },
  {
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    cpf: "123.456.789-01",
    birthDate: "22/03/1988",
    phone: "(21)912345678",
  },
  {
    name: "Carlos Silva",
    email: "carlossilva@yahoo.com",
    cpf: "987.654.321-00",
    birthDate: "15/07/1990",
    phone: "(11)998765432",
  },
  {
    name: "Ana Oliveira",
    email: "anaoliveira@hotmail.com",
    cpf: "456.789.123-45",
    birthDate: "30/09/1985",
    phone: "(71)988776655",
  },
  {
    name: "Pedro Santos",
    email: "pedrosantos@gmail.com",
    cpf: "789.123.456-78",
    birthDate: "18/01/1992",
    phone: "(61)987654321",
  },
  {
    name: "Mariana Costa da Silva",
    email: "marianacosta_dasilva_1996_long_string@gmail.com",
    cpf: "321.654.987-12",
    birthDate: "05/05/1995",
    phone: "(31)976543210",
  },
  {
    name: "Lucas Ferreira",
    email: "lucasferreira@yahoo.com",
    cpf: "654.321.789-34",
    birthDate: "11/11/1991",
    phone: "(41)965432109",
  },
  {
    name: "Fernanda Souza",
    email: "fernandasouza@gmail.com",
    cpf: "567.890.123-45",
    birthDate: "25/12/1983",
    phone: "(51)954321098",
  },
  {
    name: "Rafael Lima",
    email: "rafaellima@hotmail.com",
    cpf: "678.901.234-56",
    birthDate: "02/06/1989",
    phone: "(81)943210987",
  },
  {
    name: "Isabela Rocha",
    email: "isabelarocha@gmail.com",
    cpf: "789.012.345-67",
    birthDate: "29/02/1996",
    phone: "(91)932109876",
  },
  {
    name: "Thiago Moreira",
    email: "thiagomoreira@gmail.com",
    cpf: "123.098.456-78",
    birthDate: "03/10/1990",
    phone: "(11)945612345",
  },
  {
    name: "Laura Mendes",
    email: "lauramendes@yahoo.com",
    cpf: "987.321.654-00",
    birthDate: "07/08/1987",
    phone: "(21)954623456",
  },
  {
    name: "Rodrigo Alves Albuqeuerque",
    email: "rodrigoalves@hotmail.com",
    cpf: "456.123.789-11",
    birthDate: "20/04/1993",
    phone: "(71)988712345",
  },
  {
    name: "Patricia Pereira Santos",
    email: "patriciapereira@gmail.com",
    cpf: "789.654.123-22",
    birthDate: "14/02/1991",
    phone: "(61)912345678",
  },
  {
    name: "Gabriel Souza 2",
    email: "gabrielsouza@yahoo.com",
    cpf: "321.987.654-33",
    birthDate: "25/05/1985",
    phone: "(31)987654321",
  },
  {
    name: "Juliana Fernandes Silva",
    email: "julianafernandes@gmail.com",
    cpf: "654.789.321-44",
    birthDate: "30/07/1992",
    phone: "(41)943210987",
  },
  {
    name: "Andre Ribeiro Souza",
    email: "andreribeiro@hotmail.com",
    cpf: "567.321.987-55",
    birthDate: "12/03/1988",
    phone: "(51)932109876",
  },
  {
    name: "Amanda Lima Vera",
    email: "amandalima@gmail.com",
    cpf: "678.543.210-66",
    birthDate: "17/11/1994",
    phone: "(81)921098765",
  },
  {
    name: "Ricardo Martins Rock",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Rocha",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Ricardo Martins Silvio",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Leite",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Amanda Lima Leite",
    email: "amandalima@gmail.com",
    cpf: "678.543.210-66",
    birthDate: "17/11/1994",
    phone: "(81)921098765",
  },
  {
    name: "Ricardo Martins Leite",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Soares",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Ricardo Martins Jordao",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Jordao",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Amanda Lima Jordao",
    email: "amandalima@gmail.com",
    cpf: "678.543.210-66",
    birthDate: "17/11/1994",
    phone: "(81)921098765",
  },
  {
    name: "Ricardo Martins Reis",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo reis",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Ricardo Martins Roque Silva",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Padre",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Amanda Lima Frade",
    email: "amandalima@gmail.com",
    cpf: "678.543.210-66",
    birthDate: "17/11/1994",
    phone: "(81)921098765",
  },
  {
    name: "Ricardo Martins Bianch",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Frade",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Ricardo Martins",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Espindola",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Amanda Lima Seixas",
    email: "amandalima@gmail.com",
    cpf: "678.543.210-66",
    birthDate: "17/11/1994",
    phone: "(81)921098765",
  },
  {
    name: "Ricardo Martins Seixas",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Seixas",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
  {
    name: "Ricardo Martins Sa",
    email: "ricardomartins@yahoo.com",
    cpf: "789.321.654-77",
    birthDate: "05/01/1986",
    phone: "(91)910987654",
  },
  {
    name: "Camila Araujo Sa",
    email: "camilaaraujo@gmail.com",
    cpf: "890.654.321-88",
    birthDate: "13/09/1995",
    phone: "(21)998765432",
  },
];

const courses = [
  {
    name: "React Native 2.0",
    description: "Aprenda a criar aplicações mobile para iOS e Android",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 7456,
  },
  {
    name: "React Avançado",
    description: "Aprofunde-se em conceitos avançados do React",
    duration: "220 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 76896,
  },
  {
    name: "NodeJS para Iniciantes",
    description: "Aprenda o básico do NodeJS para desenvolvimento backend",
    duration: "160 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32453,
  },
  {
    name: "PHP Essencial",
    description: "Curso essencial de PHP para desenvolvimento web",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Java para Iniciantes",
    description: "Introdução ao Java para iniciantes",
    duration: "200 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 52487,
  },
  {
    name: "Kotlin para Android",
    description: "Desenvolvimento de aplicativos Android com Kotlin",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 3246,
  },
  {
    name: "Flutter e Dart",
    description: "Criação de aplicativos multiplataforma com Flutter e Dart",
    duration: "80 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Python para Ciência de Dados",
    description: "Uso de Python em projetos de ciência de dados",
    duration: "220 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 56856,
  },
  {
    name: "Inteligência Artificial com Python",
    description: "Introdução à inteligência artificial usando Python",
    duration: "300 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Desenvolvimento Web com Django",
    description: "Construa aplicações web robustas com Django",
    duration: "170 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 554,
  },
  {
    name: "Ruby on Rails",
    description: "Desenvolvimento web ágil com Ruby on Rails",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "DevOps com Docker",
    description: "Implantação de aplicações usando Docker",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 2487,
  },
  {
    name: "Introdução ao Kubernetes",
    description: "Gerenciamento de contêineres com Kubernetes",
    duration: "20 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "TypeScript Avançado",
    description: "Aprofunde-se em conceitos avançados de TypeScript",
    duration: "150 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Angular para Iniciantes",
    description: "Construa aplicações web com Angular",
    duration: "230 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Vue.js Essencial",
    description: "Desenvolvimento de interfaces web com Vue.js",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 123123,
  },
  {
    name: "SQL para Análise de Dados",
    description: "Manipulação e análise de dados com SQL",
    duration: "100 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "MongoDB para Desenvolvedores",
    description: "Uso de MongoDB em aplicações modernas",
    duration: "90 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Desenvolvimento com GraphQL",
    description: "Criação de APIs eficientes com GraphQL",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "C# para Desenvolvimento de Jogos",
    description: "Uso de C# na criação de jogos com Unity",
    duration: "120 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
  {
    name: "Swift para iOS",
    description: "Desenvolvimento de aplicativos iOS com Swift",
    duration: "170 horas",
    cover_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
    students: 32487,
  },
];

const modules = [
  {
    name: "ScrollLists avançadas",
    description: "Aprenda utilizar métodos avançados de scrolllist",
    duration: "3 horas",
    total_classes: 23,
    course_name: "React Native avançado",
  },
  {
    name: "State Management",
    description: "Entenda como gerenciar o estado da aplicação",
    duration: "4 horas",
    total_classes: 18,
    course_name: "React Avançado",
  },
  {
    name: "Hooks Personalizados",
    description: "Crie e utilize hooks personalizados no React",
    duration: "2 horas",
    total_classes: 12,
    course_name: "React Intermediário",
  },
  {
    name: "Design Patterns",
    description: "Aprenda os padrões de design mais utilizados",
    duration: "5 horas",
    total_classes: 25,
    course_name: "Desenvolvimento de Software",
  },
  {
    name: "Redux Toolkit",
    description: "Utilize o Redux Toolkit para simplificar seu estado global",
    duration: "3.5 horas",
    total_classes: 20,
    course_name: "Gerenciamento de Estado",
  },
  {
    name: "TypeScript Avançado",
    description: "Aprofunde seus conhecimentos em TypeScript",
    duration: "6 horas",
    total_classes: 30,
    course_name: "TypeScript Mastery",
  },
  {
    name: "Testes Unitários",
    description: "Escreva testes unitários eficientes para suas aplicações",
    duration: "4 horas",
    total_classes: 22,
    course_name: "Qualidade de Software",
  },
  {
    name: "Autenticação e Autorização",
    description: "Implemente segurança em suas aplicações",
    duration: "3 horas",
    total_classes: 15,
    course_name: "Segurança Web",
  },
  {
    name: "GraphQL Basics",
    description: "Introdução ao GraphQL e como utilizá-lo",
    duration: "2.5 horas",
    total_classes: 10,
    course_name: "APIs Modernas",
  },
  {
    name: "Deploy com Docker",
    description: "Faça deploy de suas aplicações utilizando Docker",
    duration: "5 horas",
    total_classes: 28,
    course_name: "DevOps Essentials",
  },
  {
    name: "Performance Optimization",
    description: "Otimize o desempenho de suas aplicações web",
    duration: "4 horas",
    total_classes: 20,
    course_name: "Desenvolvimento Web",
  },
  {
    name: "Microfrontends",
    description: "Arquitetura de microfrontends em aplicações modernas",
    duration: "3 horas",
    total_classes: 15,
    course_name: "Arquitetura de Software",
  },
  {
    name: "React Native Animations",
    description: "Crie animações fluidas em React Native",
    duration: "2 horas",
    total_classes: 12,
    course_name: "React Native Intermediário",
  },
  {
    name: "API Design",
    description: "Melhores práticas para desenhar APIs robustas",
    duration: "3.5 horas",
    total_classes: 18,
    course_name: "Desenvolvimento de APIs",
  },
  {
    name: "Serverless Functions",
    description: "Trabalhe com funções serverless usando AWS Lambda",
    duration: "4 horas",
    total_classes: 20,
    course_name: "Cloud Computing",
  },
  {
    name: "Kubernetes Essentials",
    description: "Gerencie containers com Kubernetes",
    duration: "5 horas",
    total_classes: 25,
    course_name: "DevOps Avançado",
  },
  {
    name: "CSS Grid Layout",
    description: "Domine o layout com CSS Grid",
    duration: "3 horas",
    total_classes: 15,
    course_name: "Frontend Mastery",
  },
  {
    name: "Mobile First Design",
    description: "Desenvolva aplicações pensando primeiro no mobile",
    duration: "2 horas",
    total_classes: 10,
    course_name: "Design Responsivo",
  },
  {
    name: "PWAs",
    description: "Crie Progressive Web Apps",
    duration: "3 horas",
    total_classes: 15,
    course_name: "Desenvolvimento Web Avançado",
  },
  {
    name: "Next.js Features - Criando um e-commerce do 0 utilizando Next 15",
    description: "Explore as funcionalidades do Next.js",
    duration: "4 horas",
    total_classes: 18,
    course_name: "React Frameworks",
  },
];

const tutors = [
  {
    name: "Ana Silva",
    email: "ana.silva@example.com",
    cpf: "123.456.789-00",
    phone: "(11) 91234-5678",
    bio: "Especialista em desenvolvimento web com 10 anos de experiência.",
  },
  {
    name: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    cpf: "234.567.890-11",
    phone: "(21) 92345-6789",
    bio: "Desenvolvedor fullstack apaixonado por tecnologia e inovação.",
  },
  {
    name: "Beatriz Souza",
    email: "beatriz.souza@example.com",
    cpf: "345.678.901-22",
    phone: "(31) 93456-7890",
    bio: "Engenheira de software focada em soluções escaláveis.",
  },
  {
    name: "Daniel Oliveira",
    email: "daniel.oliveira@example.com",
    cpf: "456.789.012-33",
    phone: "(41) 94567-8901",
    bio: "Desenvolvedor mobile com experiência em React Native e Flutter.",
  },
  {
    name: "Mariana Lima",
    email: "mariana.lima@example.com",
    cpf: "567.890.123-44",
    phone: "(51) 95678-9012",
    bio: "Designer UX/UI com forte background em psicologia cognitiva.",
  },
  {
    name: "Lucas Alves",
    email: "lucas.alves@example.com",
    cpf: "678.901.234-55",
    phone: "(61) 96789-0123",
    bio: "Especialista em DevOps e infraestrutura em nuvem.",
  },
  {
    name: "Fernanda Rocha",
    email: "fernanda.rocha@example.com",
    cpf: "789.012.345-66",
    phone: "(71) 97890-1234",
    bio: "Arquiteta de software com foco em microserviços.",
  },
  {
    name: "Ricardo Mendes",
    email: "ricardo.mendes@example.com",
    cpf: "890.123.456-77",
    phone: "(81) 98901-2345",
    bio: "Engenheiro de dados com expertise em Big Data e Machine Learning.",
  },
  {
    name: "Patrícia Santos",
    email: "patricia.santos@example.com",
    cpf: "901.234.567-88",
    phone: "(91) 99012-3456",
    bio: "Analista de sistemas com experiência em análise e modelagem de dados.",
  },
  {
    name: "Felipe Araújo",
    email: "felipe.araujo@example.com",
    cpf: "012.345.678-99",
    phone: "(11) 90123-4567",
    bio: "Desenvolvedor frontend apaixonado por design responsivo.",
  },
  {
    name: "Gabriela Costa",
    email: "gabriela.costa@example.com",
    cpf: "123.456.789-00",
    phone: "(21) 91234-5678",
    bio: "Programadora backend com experiência em Node.js e Python.",
  },
  {
    name: "João Fernandes",
    email: "joao.fernandes@example.com",
    cpf: "234.567.890-11",
    phone: "(31) 92345-6789",
    bio: "Especialista em segurança da informação e criptografia.",
  },
  {
    name: "Renata Martins",
    email: "renata.martins@example.com",
    cpf: "345.678.901-22",
    phone: "(41) 93456-7890",
    bio: "Desenvolvedora fullstack com foco em performance e otimização.",
  },
  {
    name: "Gustavo Lima",
    email: "gustavo.lima@example.com",
    cpf: "456.789.012-33",
    phone: "(51) 94567-8901",
    bio: "Engenheiro de software apaixonado por código limpo e bem estruturado.",
  },
  {
    name: "Isabela Ribeiro",
    email: "isabela.ribeiro@example.com",
    cpf: "567.890.123-44",
    phone: "(61) 95678-9012",
    bio: "Designer gráfico com foco em interfaces digitais e branding.",
  },
  {
    name: "Thiago Correia",
    email: "thiago.correia@example.com",
    cpf: "678.901.234-55",
    phone: "(71) 96789-0123",
    bio: "Especialista em bancos de dados relacionais e não relacionais.",
  },
  {
    name: "Larissa Alves",
    email: "larissa.alves@example.com",
    cpf: "789.012.345-66",
    phone: "(81) 97890-1234",
    bio: "Engenheira de software com experiência em sistemas distribuídos.",
  },
  {
    name: "Eduardo Nascimento",
    email: "eduardo.nascimento@example.com",
    cpf: "890.123.456-77",
    phone: "(91) 98901-2345",
    bio: "Desenvolvedor de jogos com experiência em Unity e Unreal Engine.",
  },
  {
    name: "Camila Ferreira",
    email: "camila.ferreira@example.com",
    cpf: "901.234.567-88",
    phone: "(11) 99012-3456",
    bio: "Analista de dados com foco em visualização e storytelling.",
  },
  {
    name: "Pedro Moreira",
    email: "pedro.moreira@example.com",
    cpf: "012.345.678-99",
    phone: "(21) 90123-4567",
    bio: "Especialista em redes e infraestrutura de TI.",
  },
];

const classes = [
  {
    name: "Introdução ao React",
    description: "Conheça os fundamentos do React.",
    tutor_name: "Ana Silva",
    module_name: "Fundamentos do React",
    course_name: "React",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "25 min",
  },
  {
    name: "Componentes e Props",
    description: "Aprenda sobre componentes e propriedades no React.",
    tutor_name: "Carlos Pereira",
    module_name: "Componentes e Props",
    course_name: "React",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "20 min",
  },
  {
    name: "Gerenciamento de Estado",
    description: "Utilizando o useState e useReducer no React.",
    tutor_name: "Beatriz Souza",
    module_name: "Gerenciamento de Estado",
    course_name: "React",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "18 min",
  },
  {
    name: "Ciclo de Vida dos Componentes",
    description: "Entenda o ciclo de vida dos componentes no React.",
    tutor_name: "Daniel Oliveira",
    module_name: "Ciclo de Vida dos Componentes",
    course_name: "React",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "15 min",
  },
  {
    name: "React Router",
    description: "Implementando navegação com React Router.",
    tutor_name: "Mariana Lima",
    module_name: "React Router",
    course_name: "React",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "22 min",
  },
  {
    name: "Hooks Avançados",
    description: "Uso de hooks personalizados e avançados no React.",
    tutor_name: "Lucas Alves",
    module_name: "Hooks Avançados",
    course_name: "React",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "25 min",
  },
  {
    name: "Fundamentos do Node.js",
    description: "Introdução ao Node.js e seu ambiente.",
    tutor_name: "Fernanda Rocha",
    module_name: "Fundamentos do Node.js",
    course_name: "Node",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "20 min",
  },
  {
    name: "Módulos do Node.js",
    description: "Trabalhando com módulos nativos e externos no Node.js.",
    tutor_name: "Ricardo Mendes",
    module_name: "Módulos do Node.js",
    course_name: "Node",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "18 min",
  },
  {
    name: "Express.js",
    description: "Construindo APIs com Express.js.",
    tutor_name: "Patrícia Santos",
    module_name: "Express.js",
    course_name: "Node",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "25 min",
  },
  {
    name: "Banco de Dados com Node.js",
    description: "Integrando bancos de dados em aplicações Node.js.",
    tutor_name: "Felipe Araújo",
    module_name: "Banco de Dados com Node.js",
    course_name: "Node",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "20 min",
  },
  {
    name: "Autenticação e Autorização",
    description: "Implementando autenticação e autorização no Node.js.",
    tutor_name: "Gabriela Costa",
    module_name: "Autenticação e Autorização",
    course_name: "Node",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "17 min",
  },
  {
    name: "Desempenho e Escalabilidade",
    description: "Melhorando o desempenho de aplicações Node.js.",
    tutor_name: "João Fernandes",
    module_name: "Desempenho e Escalabilidade",
    course_name: "Node",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "19 min",
  },
  {
    name: "Introdução ao React Native",
    description: "Fundamentos e primeiros passos com React Native.",
    tutor_name: "Renata Martins",
    module_name: "Introdução ao React Native",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "25 min",
  },
  {
    name: "Componentes Básicos",
    description: "Trabalhando com componentes básicos no React Native.",
    tutor_name: "Gustavo Lima",
    module_name: "Componentes Básicos",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "20 min",
  },
  {
    name: "Estilização com React Native",
    description: "Estilos e temas em aplicações React Native.",
    tutor_name: "Isabela Ribeiro",
    module_name: "Estilização com React Native",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "17 min",
  },
  {
    name: "Navegação em React Native",
    description: "Implementando navegação com React Navigation.",
    tutor_name: "Thiago Correia",
    module_name: "Navegação em React Native",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "22 min",
  },
  {
    name: "Gerenciamento de Estado",
    description: "Utilizando Redux e Context API no React Native.",
    tutor_name: "Larissa Alves",
    module_name: "Gerenciamento de Estado",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "19 min",
  },
  {
    name: "Integração com APIs",
    description: "Consumindo APIs RESTful em React Native.",
    tutor_name: "Eduardo Nascimento",
    module_name: "Integração com APIs",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "23 min",
  },
  {
    name: "Publicação de Aplicativos",
    description: "Publicando aplicativos na App Store e Google Play.",
    tutor_name: "Camila Ferreira",
    module_name: "Publicação de Aplicativos",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "21 min",
  },
  {
    name: "Performance em React Native",
    description: "Otimização de performance em aplicações React Native.",
    tutor_name: "Pedro Moreira",
    module_name: "Performance em React Native",
    course_name: "React Native",
    video_url:
      "https://mobyssey.com/wp-content/uploads/2021/05/attachment1620388385824.png",
    duration: "25 min",
  },
];

const dashboardMetrics = [
  {
    title: "Alunos cadastrados",
    iconName: "user",
    metric: 23438,
    link: "/dashboard/gerenciar-usuarios",
  },
  {
    title: "Cursos publicados",
    iconName: "book-open",
    metric: 12,
    link: "/dashboard/gerenciar-cursos",
  },
  {
    title: "Módulos registrados",
    iconName: "book",
    metric: 124,
    link: "/dashboard/gerenciar-modulos",
  },
  {
    title: "Tutores disponíveis",
    iconName: "user-check",
    metric: 32,
    link: "/dashboard/gerenciar-tutores",
  },
  {
    title: "Videoaulas online",
    iconName: "play-circle",
    metric: 948,
    link: "/dashboard/gerenciar-videoaulas",
  },
  {
    title: "Certificados emitidos",
    iconName: "star",
    metric: 1740,
    link: "/dashboard/consultar-certificados",
  },
];

const certificates = [
  {
    course: {
      name: "React Native 2.0",
      description: "Aprenda a criar aplicações mobile para iOS e Android",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 7456,
    },
    user: {
      name: "Lucio Silva Reis",
    },
  },
  {
    course: {
      name: "React Avançado",
      description: "Aprofunde-se em conceitos avançados do React",
      duration: "220 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 76896,
    },
    user: {
      name: "Oswaldo Silva Reis",
    },
  },
  {
    course: {
      name: "NodeJS para Iniciantes",
      description: "Aprenda o básico do NodeJS para desenvolvimento backend",
      duration: "160 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32453,
    },
    user: {
      name: "Pablo Silva Reis",
    },
  },
  {
    course: {
      name: "PHP Essencial",
      description: "Curso essencial de PHP para desenvolvimento web",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Pablo Silva Reis",
    },
  },
  {
    course: {
      name: "Java para Iniciantes",
      description: "Introdução ao Java para iniciantes",
      duration: "200 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 52487,
    },
    user: {
      name: "Celia Silva Reis",
    },
  },
  {
    course: {
      name: "Kotlin para Android",
      description: "Desenvolvimento de aplicativos Android com Kotlin",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 3246,
    },
    user: {
      name: "Joana Silva Reis",
    },
  },
  {
    course: {
      name: "Flutter e Dart",
      description: "Criação de aplicativos multiplataforma com Flutter e Dart",
      duration: "80 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Caroline Silva Reis",
    },
  },
  {
    course: {
      name: "Python para Ciência de Dados",
      description: "Uso de Python em projetos de ciência de dados",
      duration: "220 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 56856,
    },
    user: {
      name: "Caroline Silva Reis",
    },
  },
  {
    course: {
      name: "Inteligência Artificial com Python",
      description: "Introdução à inteligência artificial usando Python",
      duration: "300 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Caroline Silva Reis",
    },
  },
  {
    course: {
      name: "Desenvolvimento Web com Django",
      description: "Construa aplicações web robustas com Django",
      duration: "170 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 554,
    },
    user: {
      name: "Pablo Silva Reis",
    },
  },
  {
    course: {
      name: "Ruby on Rails",
      description: "Desenvolvimento web ágil com Ruby on Rails",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Pablo Silva Reis",
    },
  },
  {
    course: {
      name: "DevOps com Docker",
      description: "Implantação de aplicações usando Docker",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 2487,
    },
    user: {
      name: "Joao Silva Reis",
    },
  },
  {
    course: {
      name: "Introdução ao Kubernetes",
      description: "Gerenciamento de contêineres com Kubernetes",
      duration: "20 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Sara Silva Reis",
    },
  },
  {
    course: {
      name: "TypeScript Avançado",
      description: "Aprofunde-se em conceitos avançados de TypeScript",
      duration: "150 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Pablo Silva Reis",
    },
  },
  {
    course: {
      name: "Angular para Iniciantes",
      description: "Construa aplicações web com Angular",
      duration: "230 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Nicole Silva Reis",
    },
  },
  {
    course: {
      name: "Vue.js Essencial",
      description: "Desenvolvimento de interfaces web com Vue.js",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 123123,
    },
    user: {
      name: "Julio Silva Reis",
    },
  },
  {
    course: {
      name: "SQL para Análise de Dados",
      description: "Manipulação e análise de dados com SQL",
      duration: "100 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Rodrigo Silva Reis",
    },
  },
  {
    course: {
      name: "MongoDB para Desenvolvedores",
      description: "Uso de MongoDB em aplicações modernas",
      duration: "90 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Alice Silva Reis",
    },
  },
  {
    course: {
      name: "Desenvolvimento com GraphQL",
      description: "Criação de APIs eficientes com GraphQL",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Samela Silva Reis",
    },
  },
  {
    course: {
      name: "C# para Desenvolvimento de Jogos",
      description: "Uso de C# na criação de jogos com Unity",
      duration: "120 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Sabrina Silva Reis",
    },
  },
  {
    course: {
      name: "Swift para iOS",
      description: "Desenvolvimento de aplicativos iOS com Swift",
      duration: "170 horas",
      cover_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYVWu68oFmJYoMCvfy0PfgnKi9cFCtFptfg&s",
      students: 32487,
    },
    user: {
      name: "Pamela Silva Reis",
    },
  },
];

const userMetrics = [
  {
    user: {
      name: "Renato Soares da Silva",
      courses: [
        {
          name: "React Native 2.0",
          totalWatchedClasses: 45,
          totalCourseClasses: 120,
        },
      ],
    },
  },
  {
    user: {
      name: "Joana de Sá Azevedo",
      courses: [
        {
          name: "React para Iniciantes",
          totalWatchedClasses: 78,
          totalCourseClasses: 110,
        },
        {
          name: "React Native para Iniciantes",
          totalWatchedClasses: 54,
          totalCourseClasses: 120,
        },
      ],
    },
  },
  {
    user: {
      name: "Carlos Alberto Souza",
      courses: [
        {
          name: "NodeJS Avançado",
          totalWatchedClasses: 60,
          totalCourseClasses: 100,
        },
      ],
    },
  },
  {
    user: {
      name: "Maria Clara Fernandes",
      courses: [
        {
          name: "Vue.js Essencial",
          totalWatchedClasses: 90,
          totalCourseClasses: 120,
        },
      ],
    },
  },
  {
    user: {
      name: "Pedro Henrique Oliveira",
      courses: [
        {
          name: "Angular para Iniciantes",
          totalWatchedClasses: 40,
          totalCourseClasses: 90,
        },
      ],
    },
  },
  {
    user: {
      name: "Ana Paula Silva",
      courses: [
        {
          name: "Python para Data Science",
          totalWatchedClasses: 50,
          totalCourseClasses: 150,
        },
      ],
    },
  },
  {
    user: {
      name: "Rafael dos Santos",
      courses: [
        {
          name: "Java Completo",
          totalWatchedClasses: 85,
          totalCourseClasses: 200,
        },
      ],
    },
  },
  {
    user: {
      name: "Fernanda Costa",
      courses: [
        {
          name: "C# para Desenvolvimento de Jogos",
          totalWatchedClasses: 30,
          totalCourseClasses: 80,
        },
      ],
    },
  },
  {
    user: {
      name: "Lucas Martins",
      courses: [
        {
          name: "Swift para iOS",
          totalWatchedClasses: 55,
          totalCourseClasses: 170,
        },
      ],
    },
  },
  {
    user: {
      name: "Bruna Ribeiro",
      courses: [
        {
          name: "Kotlin para Android",
          totalWatchedClasses: 65,
          totalCourseClasses: 120,
        },
      ],
    },
  },
  {
    user: {
      name: "Marcos Almeida",
      courses: [
        {
          name: "Flutter e Dart",
          totalWatchedClasses: 40,
          totalCourseClasses: 100,
        },
      ],
    },
  },
  {
    user: {
      name: "Carla Torres",
      courses: [
        {
          name: "Desenvolvimento Web com Django",
          totalWatchedClasses: 70,
          totalCourseClasses: 150,
        },
      ],
    },
  },
  {
    user: {
      name: "Fábio Lima",
      courses: [
        {
          name: "Ruby on Rails",
          totalWatchedClasses: 50,
          totalCourseClasses: 120,
        },
      ],
    },
  },
  {
    user: {
      name: "Larissa Rocha",
      courses: [
        {
          name: "SQL para Análise de Dados",
          totalWatchedClasses: 80,
          totalCourseClasses: 100,
        },
      ],
    },
  },
  {
    user: {
      name: "Vinicius Freitas",
      courses: [
        {
          name: "MongoDB para Desenvolvedores",
          totalWatchedClasses: 40,
          totalCourseClasses: 90,
        },
      ],
    },
  },
  {
    user: {
      name: "Patrícia Mendes",
      courses: [
        {
          name: "TypeScript Avançado",
          totalWatchedClasses: 90,
          totalCourseClasses: 150,
        },
      ],
    },
  },
  {
    user: {
      name: "Júlio César Pereira",
      courses: [
        {
          name: "DevOps com Docker",
          totalWatchedClasses: 50,
          totalCourseClasses: 100,
        },
      ],
    },
  },
  {
    user: {
      name: "Simone Xavier",
      courses: [
        {
          name: "Introdução ao Kubernetes",
          totalWatchedClasses: 30,
          totalCourseClasses: 50,
        },
      ],
    },
  },
  {
    user: {
      name: "Rodrigo Oliveira",
      courses: [
        {
          name: "GraphQL para Desenvolvedores",
          totalWatchedClasses: 70,
          totalCourseClasses: 120,
        },
      ],
    },
  },
  {
    user: {
      name: "Amanda Ferreira",
      courses: [
        {
          name: "Inteligência Artificial com Python",
          totalWatchedClasses: 100,
          totalCourseClasses: 200,
        },
      ],
    },
  },
];

export {
  certificates,
  classes,
  courses,
  dashboardMetrics,
  menuItems,
  modules,
  tutors,
  userMetrics,
  users,
};
