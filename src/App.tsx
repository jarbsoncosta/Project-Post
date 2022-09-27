import { Header } from "./components/Header"
import { Post } from './components/Post'
import { Sidebar } from "./components/Sidebar"
import styles from './App.module.css'
import './global.css'

const posts =[
  {
    id:1,
    author:{
      avatarUrl:"https://avatars.githubusercontent.com/u/80639874?v=4",
      name: "Jarbson Costa",
      role: "Web Developer",
    },
    content:[
      {type:"paragraph", content:"Fala galeraa 👋"},
      {type:"paragraph", content:"Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      {type:"link", content:"jarbson.design/doctorcare"},
    ],
    publishedAt: new Date('2022-08-10 20:30:00')
  },
  {
    id:2,
    author:{
      avatarUrl:"https://avatars.githubusercontent.com/u/2254731?v=4",
      name: "Diego Fernandes",
      role: "CTO @Rocketseat",
    },
    content:[
      {type:"paragraph", content:"Fala galeraa 👋"},
      {type:"paragraph", content:"Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      {type:"link", content:"diego.design/doctorcare"},
    ],
    publishedAt: new Date('2022-08-17 21:00:00')
  }
]

function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return(
              <Post 
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
              
              />
            )
          })}
        </main>   
      </div>
    </div>

  )
}

export default App
