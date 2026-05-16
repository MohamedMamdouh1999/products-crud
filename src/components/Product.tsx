import CircleColor from "./CircleColor";
import Image from "./ui/Image";
import Button from "./ui/Button";

import type { IProduct } from "../interfaces/product";

import { textSlicer } from "../utils/text-slicer";
import { numberWithCommas } from "../utils/number-with-commas";

interface IProps {
    product: IProduct;
    onEditHandler: (id: string) => void;
    onDeleteHandler: (id: string) => void;
}

const Product = ({ product, onEditHandler, onDeleteHandler }: IProps) => {
    // States
    const colorsList = product.colors.map((color) => <CircleColor key={color} color={color} />);

    return (
        <div className="max-w-sm md:max-w-none md:w-full mx-auto flex flex-col gap-y-3 p-3 border border-gray-400 rounded-md">
            {product.imageURL && <Image className="rounded-md h-48 object-cover object-center" src={product.imageURL} alt={product.title} />}
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm min-h-10">{textSlicer(product.description)}</p>
            <div className="flex flex-wrap items-center gap-1">
                {colorsList}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-lg font-semibold text-indigo-900">
                    ${numberWithCommas(product.price)}
                </span>
                <div className="flex items-center gap-x-2">
                    {product.category.imageURL && <Image className="rounded-full w-8 h-8 object-cover object-center" src={product.category.imageURL} alt={product.category.name} />}
                    <span className="text-sm">{product.category.name}</span>
                </div>
            </div>
            <div className="flex items-center gap-x-2">
                <Button onClick={() => onEditHandler(product.id!)} className="bg-violet-800 hover:bg-violet-900">Edit</Button>
                <Button onClick={() => onDeleteHandler(product.id!)} className="bg-red-700 hover:bg-red-800">Delete</Button>
            </div>
        </div>
    );
};

export default Product;
