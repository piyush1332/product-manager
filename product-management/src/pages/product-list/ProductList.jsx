import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
import Header from '../../components/header/Header';
import Layout from '../../components/layout/Layout';
import Table from '../../components/table/Table';
import { getProductList } from '../../service/service';
import styles from './product.module.css';

function ProductList() {

    const [productList, setProductList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [tableFilter, setTableFilter] = useState('');
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [alert, setAlert] = useState('');
    const [dateFilter, setDateFilter] = useState({
        start: '',
        end: ''
    });
    const [sortingFilter, setSortingFilter] = useState('Desc');
    const navigate = useNavigate();

    const getProductInformation = async () => {
        setLoaderStatus(true);
        const response = await getProductList({ pn: pageNumber, filter: tableFilter, dateFilterStart: dateFilter.start, dateFilterEnd: dateFilter.end, sort: sortingFilter });
        setLoaderStatus(false)
        const result = await response.json();
        setProductList(result)
    }

    const handleSortChange = (e) => {
        // const
        console.log(e.target.value)
        setSortingFilter(e.target.value)
    }

    const handleDateFilter = (e, source) => {
        const dummy = { ...dateFilter }
        dummy[source] = e.target.value;
        setDateFilter(dummy);
    }

    const handleClearFilter = () => {
        setPageNumber(1);
        setTableFilter('');
        setSortingFilter('Desc');
        setDateFilter({
            start: '',
            end: ''
        });
    }

    const handleAlert = () => {
        if (window.location.href.includes('create')) {
            setAlert('Product Created Successfully');
            setTimeout(() => {
                setAlert('');
                navigate('/');
            }, 3000);
        } else if (window.location.href.includes('update')) {
            setAlert('Product Updated Successfully');
            setTimeout(() => {
                setAlert('');
                navigate('/');
            }, 3000);
        } else {
            setAlert('');
        }
    }

    useEffect(() => {
        getProductInformation();
        handleAlert();
    }, [pageNumber, tableFilter, dateFilter, sortingFilter]);

    return (
        <>
            <Header />
            <Layout>
                {!!alert && <Alert message={alert} />}
                <div className={styles.container}>
                    <div className={styles.filter_container}>
                        <div>
                            <div> Search </div>
                            <div>
                                <input className={styles.search_filter} type="text" value={tableFilter} onChange={(e) => setTableFilter(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div>Start Date</div>
                            <div>
                                <input className={styles.search_filter} type="date" value={dateFilter.start} onChange={(e) => handleDateFilter(e, 'start')} />
                            </div>
                        </div>
                        <div>
                            <div>End Date</div>
                            <div>
                                <input className={styles.search_filter} type="date" value={dateFilter.end} onChange={(e) => handleDateFilter(e, 'end')} />
                            </div>
                        </div>
                        <div>
                            <div>Sort</div>
                            <div>
                                <select className={styles.search_filter} name="" value={sortingFilter} onChange={handleSortChange}>
                                    <option value="Asc"> Asceding </option>
                                    <option value="Desc"> Decending </option>
                                </select>
                            </div>
                        </div>
                        <button className={styles.clear_filter_btn} onClick={handleClearFilter} > Clear </button>
                        <button className={styles.add_product_btn} onClick={() => navigate('/product')} > Add Product </button>
                    </div>
                    <Table data={productList} />
                    <div className={styles.pagination_container}>
                        <button style={{ background: (productList.length === 0 || productList.length < 5) ? 'grey' : '' }} onClick={() => setPageNumber(pageNumber + 1)} disabled={productList.length === 0 || productList.length < 5} >Next</button>
                        <span>{pageNumber}</span>
                        <button style={{ background: (pageNumber === 1) ? 'grey' : '' }} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Previous</button>
                    </div>
                </div>
                {loaderStatus && <div className='loader'> </div>}
            </Layout>
        </>
    )
}

export default ProductList;