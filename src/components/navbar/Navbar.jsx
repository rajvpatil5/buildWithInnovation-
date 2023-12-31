import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../../redux/cart/cart.selector';
import { setSearchProducts } from '../../redux/searchProducts/searchProducts.reducer';
import { useSearchProductsQuery } from '../../redux/services/BWICore';
import Spinner from '../spinner/Spinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Navbar = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const cartItems = useSelector(selectCartCount);
  const { data: getSearchProductsData, isFetching: getSearchProductsFetching } = useSearchProductsQuery({ searchQuery: debouncedSearchTerm });
  const dispatch = useDispatch();

  dispatch(setSearchProducts(getSearchProductsData));

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitForm = (data) => {
    const { search } = data;
    console.log(search);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-[#f2f3f5]">
      <div className="container py-8 flex flex-col lg:flex-row gap-8 items-center lg:justify-between">
        <Link to={'/'} className="font-extrabold text-5xl">
          E-com
        </Link>

        <div className="flex items-center justify-center gap-2 w-full lg:w-[50%]">
          <Input {...register('search', {})} name="search" placeholder="Search" type="text" onChange={handleChange} />
          <Button onClick={handleSubmit(handleSubmitForm)}>{getSearchProductsFetching ? <Spinner /> : <FaSearch className="w-5 h-5" />}</Button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-semibold">Cart</span>
          <div className="relative">
            <FaShoppingCart className="h-[30px] w-[30px]" />
            <span className="h-[20px] w-[20px] bg-gray-400 flex justify-center items-center rounded-full absolute top-[-40%] right-[-40%]">
              {cartItems}
            </span>
          </div>
        </div>

        <Button className="text-lg font-semibold bg-transparent text-black hover:bg-transparent" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
