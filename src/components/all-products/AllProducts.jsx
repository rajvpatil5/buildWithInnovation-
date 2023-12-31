import { Breadcrumbs } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart, removeItemToCart } from '../../redux/cart/cart.reducer';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { useGetProductsQuery } from '../../redux/services/BWICore';
import ClearCriteria from '../criteria/ClearCriteria';
import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider';
import SkeletonCard from '../skeletonCard/SkeletonCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import ErrorMessage from '../error/ErrorMessage';
import { setAllProducts } from '../../redux/allProducts/allProducts.reducer';
import { selectAllProducts } from '../../redux/allProducts/allProducts.selector';
import { selectSearchProducts } from '../../redux/searchProducts/searchProducts.selector';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { data: getProductsData, isFetching: getProductsFetching, error: getProductsError } = useGetProductsQuery();
  const cartItems = useSelector(selectCartItems);
  const increaseQuantityOfProduct = ({ item }) => dispatch(addItemToCart(item));
  const removeProductToCart = ({ item }) => dispatch(removeItemToCart(item));
  // eslint-disable-next-line no-unused-vars
  const [min, setMin] = useState(0);
  const [max, setMax] = useState();
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const allProductsRedux = useSelector(selectAllProducts);
  const searchProductsRedux = useSelector(selectSearchProducts);
  const displayProducts =
    searchProductsRedux?.searchProducts?.products.length > 0 ? searchProductsRedux?.searchProducts : allProductsRedux?.allProducts;

  dispatch(setAllProducts(getProductsData));

  useEffect(() => {
    const filtered = displayProducts?.products.filter((item) => item.price >= minVal && item.price <= maxVal);
    setFilteredProducts(filtered);
  }, [minVal, maxVal, displayProducts?.products]);

  const handleMinInputChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };

  const handleMaxInputChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
  };

  const handlePriceChangeLeft = useCallback(
    (event) => {
      const minvalue = Math.min(Number(event.target.value), maxVal - 1);
      setMinVal(minvalue);
      minValRef.current = minvalue;
    },
    [maxVal]
  );

  const handlePriceChangeRight = useCallback(
    (event) => {
      const maxvalue = Math.max(Number(event.target.value), minVal + 1);
      setMaxVal(maxvalue);
      maxValRef.current = maxvalue;
    },
    [minVal]
  );

  const handleMaxValue = useCallback(() => {
    const maxV = Math.max(...displayProducts.products.map((item) => item.price));
    setMaxVal(maxV);
    setMax(maxV);
  }, [displayProducts?.products]);

  const handleCriteria = () => {
    console.log('handleCriteria');
    setMinVal(0);
    handleMaxValue();
  };

  useEffect(() => {
    setFilteredProducts(displayProducts?.products);
    if (displayProducts?.products) handleMaxValue();
  }, [displayProducts?.products, handleMaxValue]);

  if (getProductsError) {
    return <ErrorMessage />;
  }

  if (getProductsFetching) {
    return (
      <div className="container my-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {[...Array(10).keys()].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      <div className=" my-16">
        <div className="mb-8">
          <Breadcrumbs separator=">" aria-label="breadcrumb">
            <Link to={'/'} className="hover:underline" color="inherit">
              Home
            </Link>
          </Breadcrumbs>
        </div>

        <div className="flex gap-8  flex-col lg:flex-row">
          {/* Filters */}
          <div>
            <div className="bg-[#f2f3f5] lg:w-[350px] w-full p-2">
              <div className="font-semibold text-xl mb-8">Filters</div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="Price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent className="px-1">
                      <div className="py-8">
                        <MultiRangeSlider
                          min={min}
                          max={max}
                          onChangeLeft={handlePriceChangeLeft}
                          onChangeRight={handlePriceChangeRight}
                          minVal={minVal}
                          maxVal={maxVal}
                          minValRef={minValRef.current}
                          maxValRef={maxValRef.current}
                          handleMinInputChange={handleMinInputChange}
                          handleMaxInputChange={handleMaxInputChange}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          <div className={`p-2 ${filteredProducts ? 'xl:w-[800px] md:w-[500px] ' : 'flex-grow'} bg-[#f2f3f5]`}>
            <div className="font-bold text-3xl mb-16">All Products</div>

            {filteredProducts?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 ">
                {filteredProducts &&
                  filteredProducts.map((item) => (
                    <Card key={item.id} className="relative">
                      <div className="max-w-max px-2 rounded flex justify-center items-center absolute left-[1%] top-[2%] bg-[#e5e5e5]">
                        Save {item.discountPercentage} %
                      </div>
                      <CardContent className="pt-6">
                        <img
                          src={`${item.images[item.images.length - 1]}`}
                          alt=""
                          className="bg-no-repeat bg-cover rounded-lg w-full h-[300px] lg:h-[200px]"
                        />
                      </CardContent>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <div className="flex items-center justify-between p-6 pt-0">
                        <div className="text-2xl flex-grow">$. {Math.round(item.price - item.price * (item.discountPercentage / 100))}</div>
                        <div className="text-gray-500 line-through">$. {item.price}</div>
                      </div>
                      <CardFooter>
                        <div className="flex flex-col gap-4">
                          <Button onClick={() => increaseQuantityOfProduct({ item })}>Add to Cart</Button>
                          {cartItems.map(
                            (cartItem) =>
                              cartItem.id === item.id && (
                                <div key={cartItem.id}>
                                  <Button onClick={() => removeProductToCart({ item })} className="bg-[#ff5151] hover:bg-[#ff6565]">
                                    Remove from Cart
                                  </Button>
                                </div>
                              )
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] w-full">
                <ClearCriteria handleCriteria={() => handleCriteria()} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
