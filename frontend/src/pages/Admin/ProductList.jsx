import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';

const ProductList = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();

            productData.append('image', image);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('category', category);
            productData.append('quantity', quantity);
            productData.append('brand', brand);
            productData.append('countInStock', stock);

            const { data } = await createProduct(productData);

            if (data.error) {
                toast.error('Product creation failed.');
            } else {
                toast.success(`${data.name} created successfully.`);
                navigate('/');
            }


        } catch (error) {
            console.log(error);
            toast.error('Product creation failed.');
            
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
           const response = await uploadProductImage(formData).unwrap();
           toast.success(response.message);
           setImage(response.image);
              setImageUrl(response.image);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                {/* <AdminMenu /> */}

                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>
                    {imageUrl && (
                        <div className="text-center">
                            <img
                                src={imageUrl}
                                alt="product"
                                className="block mx-auto max-h-[200px]"
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="bg-gray-300 border px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : 'Choose Image'}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? 'hidden' : ''}
                            />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray-300"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="name block">Price</label> <br />
                                <input
                                    type="number"
                                    className=" p-4 mb-3 w-[30rem] border rounded-lg bg-gray-300"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name block">Quantity</label>{' '}
                                <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray-300"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="name block">Brand</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray-300"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>
                        <label
                            htmlFor=""
                            className="my-5"
                        >
                            Description
                        </label>{' '}
                        <br />
                        <textarea
                            type="text"
                            className="p-2 mb-3 bg-gray-300 border rounded-lg w-[95%]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">
                                    Count in Stock
                                </label>{' '}
                                <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray-300"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Category</label> <br />
                                <select
                                    placeholder="Choose Category"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray-300"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    {categories?.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="py-4 px-10 mt-5 rounded-lg text-lg bg-pink-600 text-white"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
