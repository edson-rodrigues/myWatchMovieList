import { useState } from "react"
import api from "../api/movies"
import {useHistory} from 'react-router-dom'

function Edit(props){
    const [name, setName] = useState(props.location.state.name)
    const [description, setDescription] = useState(props.location.state.description)
    const[date, setDate] = useState(props.location.state.date)
    const[gender, setGender] = useState(props.location.state.gender)
   
    let history = useHistory()

    function nameHandler(event){
        setName(event.target.value)
    }
    function descriptionHandler(event){
        setDescription(event.target.value)
    }
    function dateHandler(event){
        setDate(event.target.value)
    }
    function genderHandler(event){
        setGender(event.target.value)
    }

    function submitHandler(event){
        event.preventDefault()
        api.put(`/movies/${props.location.state.id}`,
            {
                'id': props.location.state.id,
                'title': name,
                'description': description,
                'releaseDate': date,
                'gender': gender

            }
        ).then(res => {
            console.log(res.data);
            history.push('/movielist')
          })
    }
    return(  
        <form  className="ui fluid form" onSubmit={submitHandler}>
        <h4 className="ui dividing header">Editar Cadastro de Filmes</h4>
        <label htmlFor="title">Título</label>  
        <input placeholder= "Título do Filme" type="text" name="title" value={name} onChange={nameHandler}></input>
        
        <label htmlFor="description">Sinopse</label>  
        <textarea placeholder="Sinopse do Filme" value={description} name="description" id="" cols="30" rows="10" onChange={descriptionHandler}></textarea>
        
        

        <div className="two-fields">
            <div>    
                <label htmlFor="date">Data de Estreia</label>
                <input className="ui input" type="date" name="date" id="1" value={date} onChange={dateHandler} />
            </div>
            <div>
                <label htmlFor="gender">Gênero</label>         
                <select className="ui-dropdown" name="gender" id="" value={gender} onChange={genderHandler}>
                    <option value=" "> </option>
                    <option value="Ação">Ação</option>
                    <option value="Drama">Drama</option>
                    <option value="Comédia">Comédia</option>
                    <option value="Animação">Animação</option>
                    <option value="Sci-fi">Ficção Científica</option>
                    <option value="Terror">Terror</option>
                    <option value="Suspense">Suspense</option>
                    <option value="Fantasia">Fantasia</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Romance">Romance</option>
                    <option value="Documentário">Documentário</option>
                </select>
            </div>
        </div>
        <div className="submit-button">
            <button className="ui primary button" type="submit">Editar <i class="edit outline icon"></i></button>
        </div>
    </form>
    )
}
export default Edit