import { useState } from 'react'
import './App.css'
import Header from './componentes/Header'
import Header2 from './componentes/Header2'
import Article from './componentes/Article'
import Main from './componentes/Main'
import Container from './componentes/Container'
import Sidebar from './componentes/Sidebar'
import SidebarItem from './componentes/SidebarItem'
import RelatedPost from './componentes/RelatedPost'
import Footer from './componentes/Footer'
function App() {


  return (
    <>
      <Header />
      <Container>
        <Header2 />
        <Main>
          <Article />
          <Article />
          <Article />
        </Main>
        <Sidebar>
          <SidebarItem img="https://picsum.photos/300/200?random=1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, et!
          </SidebarItem>
          <SidebarItem img="https://picsum.photos/300/200?random=2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, et!
          </SidebarItem>
          <SidebarItem img="https://picsum.photos/300/200?random=3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, et!
          </SidebarItem>
        </Sidebar>

        <RelatedPost>Another post</RelatedPost>
        <RelatedPost>Another post</RelatedPost>
        <RelatedPost>Another post</RelatedPost>
        <RelatedPost>Another post</RelatedPost>
        <RelatedPost>Another post</RelatedPost>

        <Footer />
      </Container>

    </>
  )
}

export default App
