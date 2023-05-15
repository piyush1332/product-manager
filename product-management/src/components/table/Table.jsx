import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './table.module.css';

function Table(props) {

    const navigate = useNavigate();

    return (
        <>
            <table className={styles.table}>
                <tr className={styles.table_header}>
                    <th>ID</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    {props.data?.map((item, index) => {
                        return (
                            <tr key={"table_row_" + index} className={styles.table_row}>
                                <td>{item.id}</td>
                                <td> <div className={styles.image_holder}> <img src={`http://localhost:4000${item.image}`} alt="" /> </div> </td>
                                <td>{item.name}</td>
                                <td>₹ {item.price}</td>
                                <td>{item.created_at}</td>
                                <td> <button className={styles.table_action_button} onClick={() => navigate(`/product/${item.id}`)} > Edit </button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {props.data.length === 0 && <h3 className={styles.no_product_found}>
                No Product Found
            </h3>}
        </>
    )
}

export default Table;