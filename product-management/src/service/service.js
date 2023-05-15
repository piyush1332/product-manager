const host = "http://localhost:4000";

export async function getProductList(payload) {
    console.log(payload)
    const response = await fetch(`${host}/api/products?pn=${payload.pn}&filter=${payload.filter}&date_start=${payload.dateFilterStart}&date_end=${payload.dateFilterEnd}&sort=${payload.sort}`);
    return response;
}

export async function createProduct(payload) {
    const response = await fetch(`${host}/api/product/create`, {
        method: "POST",
        body: payload
    });
    return response;
}

export async function updateProduct(payload) {
    const response = await fetch(`${host}/api/product/create`, {
        method: "PUT",
        body: payload
    });
    return response;
}

export async function getProductDetail(payload) {
    const response = await fetch(`${host}/api/product/${payload.id}`);
    return response;
}