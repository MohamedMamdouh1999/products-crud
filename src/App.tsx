import { useState } from "react";
import { v7 as uuid } from "uuid";

import { products } from "./data/products";
import { formInputs } from "./data/form-inputs";
import { categories } from "./data/categories";
import { colors } from "./data/colors";

import Product from "./components/Product";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import Error from "./components/ui/Error";
import Select from "./components/ui/Select";
import CircleColor from "./components/CircleColor";

import type { IProduct } from "./interfaces/product";

import { productValidation } from "./validations/product-validation";

const App = () => {
    // States
    const defaultProduct: IProduct = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: [],
        category: {
            id: "",
            name: "",
            imageURL: "",
        },
    };
    const [product, setProduct] = useState<IProduct>(defaultProduct);
    const [productsData, setProductsData] = useState<IProduct[]>(products);
    const [selected, setSelected] = useState(categories[3]);
    const [tempColors, setTempColors] = useState<string[]>([]);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: ""
    });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModal = () => setIsOpenModal(true);
    const closeModal = () => {
        setIsOpenModal(false);
        setProduct(defaultProduct);
        setTempColors([]);
        setErrors({
            title: "",
            description: "",
            imageURL: "",
            price: "",
            colors: ""
        });
    };

    // Handlers
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ""
        });
    };
    const onSubmitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { title, description, imageURL, price } = product;
        const errors = productValidation({
            title,
            description,
            imageURL,
            price,
            colors: tempColors
        });
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) {
            setErrors(errors);
            return;
        }

        const newProduct = {
            ...product,
            id: uuid(),
            category: selected,
            colors: tempColors
        };
        setProductsData([newProduct, ...productsData]);
        closeModal();
    };

    // Renders
    const productsList = productsData.map((product) => (
        <Product key={product.id} {...product} />
    ));
    const inputsList = formInputs.map((input) => (
        <div key={input.id} className="flex flex-col gap-y-1">
            <label htmlFor={input.id}>{input.label}</label>
            <Input
                type={input.type}
                name={input.name}
                id={input.id}
                placeholder={input.label}
                value={product[input.name]}
                onChange={onChangeHandler}
            />
            <Error message={errors[input.name as keyof typeof errors]} />
        </div>
    ));
    const colorsList = colors.map((color) => (
        <CircleColor key={color} color={color} onClick={() => {
            if (tempColors.includes(color)) {
                setTempColors(tempColors.filter((c) => c !== color));
            } else {
                setTempColors([...tempColors, color]);
                setErrors({ ...errors, colors: "" });
            }
        }} />
    ));
    const tempColorsList = tempColors.map(color => <span key={color} style={{backgroundColor: color}} className="rounded-md text-white p-1">{color}</span>);

    return (
        <main className="container mx-auto p-5 flex flex-col gap-y-5">
            <Button
                className="bg-indigo-800 hover:bg-indigo-900 mx-auto"
                width="w-fit"
                onClick={openModal}
            >
                Add a new product
            </Button>
            <Modal
                isOpen={isOpenModal}
                close={closeModal}
                title="Add a new product"
            >
                <form
                    onSubmit={onSubmitHandler}
                    className="flex flex-col gap-y-3"
                >
                    {inputsList}
                    <Select selected={selected} setSelected={setSelected} />
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1">
                            {colorsList}
                        </div>
                        <Error message={errors.colors} />
                    </div>
                    {tempColors.length > 0 && 
                        <div className="flex flex-wrap items-center gap-1">
                            {tempColorsList}
                        </div>
                    }
                    <div className="flex items-center gap-x-2">
                        <Button
                            type="submit"
                            className="bg-violet-800 hover:bg-violet-900"
                        >
                            Save
                        </Button>
                        <Button
                            type="reset"
                            onClick={closeModal}
                            className="bg-red-700 hover:bg-red-800"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {productsList}
            </section>
        </main>
    );
};

export default App;
