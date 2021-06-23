import { useState, useEffect, useMemo } from 'react'
import {Link} from 'react-router-dom'
import { useTable } from 'react-table'

import DataBr from './DataBr'

import api from '../api/movies'

function MovieList(){
    const[movies, setMovies] = useState([])

    useEffect(function(){
        api.get('/movies')
        .then(
            function(res){
                const movieList = res.data
                setMovies(movieList)
            }
            )
    }, [movies.length])

    const handleDelete = async (id) => {
      await(api.delete(`/movies/${id}`))
      const newMovieList = movies.filter((movie)=>{
        return movie.id !== id
      })
      setMovies(newMovieList)
    }
    const columns = useMemo(
        ()=> [
                {
                    Header: 'Título',
                    accessor: "title"
                },
                {
                    Header: 'Sinopse',
                    accessor: 'description'
                },
                {
                    Header: 'Data Lançamento',
                    accessor: 'releaseDate',
                    Cell: row => ( 
                      <DataBr data={row.row.original.releaseDate}/>
                    )
                },
                {
                    Header: 'Gênero',
                    accessor: 'gender'
                },
                {
                    Header: '',
                    accessor: 'id',
                    Cell: row => (
                      <>
                      <span style={{cursor: 'pointer'}} onClick={() => handleDelete(row.value)}><i style={{color: 'red'}}className="trash alternate outline icon"></i></span>
                      <Link to={{
                        pathname: "/edit",
                        state:{
                          id: row.row.original.id,
                          name: row.row.original.title,
                          description: row.row.original.description,
                          date: row.row.original.releaseDate,
                          gender: row.row.original.gender
                        }
                      }}><i className="edit outline icon"></i></Link>
                      
                      
                      </>
                      )
                },
            ],
        []
    )

    
    const data = movies
    
    const tableInstance = useTable({columns, data})


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance

    return(
        // apply the table props
   <table className="ui celled table" {...getTableProps()}>
   <thead>
     {// Loop over the header rows
     headerGroups.map(headerGroup => (
       // Apply the header row props
       <tr {...headerGroup.getHeaderGroupProps()}>
         {// Loop over the headers in each row
         headerGroup.headers.map(column => (
           // Apply the header cell props
           <th {...column.getHeaderProps()}>
             {// Render the header
             column.render('Header')}
           </th>
         ))}
       </tr>
     ))}
   </thead>
   {/* Apply the table body props */}
   <tbody {...getTableBodyProps()}>
     {// Loop over the table rows
     rows.map(row => {
       // Prepare the row for display
       prepareRow(row)
       return (
         // Apply the row props
         <tr {...row.getRowProps()}>
           {// Loop over the rows cells
           row.cells.map(cell => {
             // Apply the cell props
             return (
               <td {...cell.getCellProps()}>
                 {// Render the cell contents
                 cell.render('Cell')}
               </td>
             )
           })}
         </tr>
       )
     })}
   </tbody>
 </table>
    )
}
export default MovieList