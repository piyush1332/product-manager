import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Layout from '../../components/layout/Layout';
import { createProduct, getProductDetail, updateProduct } from '../../service/service';
import styles from './add.module.css';

function AddProducts() {

    const [productInfo, setProductInfo] = useState({
        product_name: '',
        product_image: '',
        image: '',
        product_price: ''
    });
    const [loaderStatus, setLoaderStatus] = useState(false)
    const [errorStatus, setErrorStatus] = useState({
        name: false,
        image: false,
        price: false
    });

    const fileInput = useRef(null);
    const navigate = useNavigate();
    const params = useParams();

    const handleOnChnage = (e) => {
        const { name, value } = e.target;
        const dummyState = { ...productInfo };
        if (name === "product_image") {
            dummyState["product_image"] = value;
            dummyState["image"] = e.target.files[0];
        } else {
            dummyState[name] = value;
        }
        setProductInfo(dummyState)
    }

    const handleValidation = () => {
        let validation = true;
        const dummyState = { ...errorStatus };
        if (!productInfo.product_name) {
            validation = false;
            dummyState.name = true;
        } else {
            dummyState.name = false;
        }
        if (!productInfo.product_price) {
            validation = false;
            dummyState.price = true;
        } else {
            dummyState.price = false;
        }
        if (!productInfo.product_image) {
            validation = false;
            dummyState.image = true;
        } else {
            dummyState.image = false;
        }
        setErrorStatus(dummyState);
        return validation;
    }

    const handleSubmit = async () => {
        if (handleValidation()) {
            const formData = new FormData();
            formData.append('name', productInfo.product_name);
            formData.append('image', productInfo.image);
            formData.append('price', productInfo.product_price);
            if (!!params.id) {
                formData.append('id', params.id)
                setLoaderStatus(true);
                const response = await updateProduct(formData);
                setLoaderStatus(false);
                const result = await response.json();
                if (result.status) navigate('/?update=true');
            } else {
                setLoaderStatus(true);
                const response = await createProduct(formData);
                setLoaderStatus(false);
                const result = await response.json();
                if (result.status) navigate('/?create=true');
            }
        }
    }

    const loadProductDetail = async () => {
        setLoaderStatus(true);
        const response = await getProductDetail({ id: params.id });
        setLoaderStatus(false);
        const result = await response.json();
        if (!!result.length) {
            const dummyState = { ...productInfo };
            dummyState['product_name'] = result[0]?.name;
            dummyState['product_image'] = result[0]?.image === null ? '' : result[0]?.image;
            dummyState['product_price'] = result[0]?.price;
            setProductInfo(dummyState)
        } else {
            navigate('/not-found');
        }
    }

    useEffect(() => {
        if (!!params.id) loadProductDetail()
    }, []);

    return (
        <>
            <Header />
            <Layout >
                <div className={styles.form_holder}>
                    <div className={styles.form_row}>
                        <h3>Product Name</h3>
                        <input type="text" name="product_name" value={productInfo.product_name} onChange={handleOnChnage} />
                        {!!errorStatus.name && <div className={styles.error}> Product name is required. </div>}
                    </div>
                    <div className={styles.form_row}>
                        <h3>Product Image</h3>
                        <div onClick={() => fileInput.current.click()} className={styles.image_holder} >
                            {!!productInfo.product_image && !!productInfo.image && <img src={URL.createObjectURL(productInfo.image)} alt="" />}
                            {!productInfo.image && !!productInfo.product_image && <img src={`http://localhost:4000${productInfo.product_image}`} alt="" />}
                        </div>
                        <input ref={fileInput} type="file" name="product_image" onChange={handleOnChnage} hidden />
                        {!!errorStatus.image && <div className={styles.error}> Product image is required. </div>}
                    </div>
                    <div className={styles.form_row}>
                        <h3> Product Price </h3>
                        <input type="text" name="product_price" value={productInfo.product_price} onChange={handleOnChnage} />
                        {!!errorStatus.price && <div className={styles.error}> Product price is required. </div>}
                    </div>
                    <input className={styles.submit_btn} type="button" onClick={handleSubmit} value={"submit"} />
                </div>
                {loaderStatus && <div className='loader'> </div>}
            </Layout>
        </>
    )
}

export default AddProducts;