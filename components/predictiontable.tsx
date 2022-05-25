import styles from '../styles/table.module.css'
import Layout from '../components/layout'

const Table = ()=>{
    return(
        <table>
            <thead>
                <tr>
                    <th>Stock ticker</th>
                    <th>Price</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>AAPL</td>
                    <td>156.33</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table