import { useState } from "react"
import api from "../api/movies"
import { v4 as uuidv4 } from 'uuid'

function SignUp(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const[date, setDate] = useState('')
    const[gender, setGender] = useState('')
   
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
        console.log(gender)
    }

    function submitHandler(event){
        event.preventDefault()
        api.post('/movies',
            {
                'id': uuidv4(),
                'title': name,
                'description': description,
                'releaseDate': date,
                'gender': gender

            }
        ).then(res => {
            console.log(res);
            console.log(res.data);
            setName('')
            setDescription('')
            setDate('')
            setGender('Ação')
          })
    }
    return(  
            <form  className="ui fluid form" onSubmit={submitHandler}>
                <h4 className="ui dividing header">Cadastro de Filmes</h4>
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
                    <button className="ui primary button" type="submit">Salvar <i className="save outline icon"></i></button>
                </div>
            </form>
    )
}
export default SignUp