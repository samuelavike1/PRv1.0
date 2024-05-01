import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeadings from "@/Components/TableHeadings.jsx";
import ParentLayout from "@/Layouts/ParentLayout.jsx";
import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

const index = ({auth, users, queryParams=null, message }) =>{

    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name]=value;
        }else{
            delete queryParams[name];
        }
        router.get(route('user.index'), queryParams);
    };

    const onKeyPress = (name, e) =>{
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';

            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';

        }
        router.get(route('user.index'), queryParams);
    };

    const DeleteUser = (user) => {
        if(!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }
        router.delete(route('user.destroy',user.id))
    }

    const {data, setData,post:store,errors,reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [confirmingUserStoreModal, setConfirmingUserStoreModal] = useState(false)
    const confirmUserStoreModal = () => setConfirmingUserStoreModal(true);
    const closeStoreModal = () => setConfirmingUserStoreModal(false);

    const storeUser = (e) => {
        e.preventDefault();

        store(route('user.store'), {
            preserveScroll: true,
            onSuccess: () => setConfirmingUserStoreModal(false),
            onFinish: () => reset(),
        });
    }


    return(
        <>
        <Authenticated
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>
                    <button onClick={confirmUserStoreModal}
                          // href={route('user.create')}
                          className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>Add New</button>
                </div>
            }>
            <Head title="Users"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className='overflow-auto'>
                                <table
                                    className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                    <thead
                                        className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <TableHeadings
                                            name='id'
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >ID</TableHeadings>
                                        <TableHeadings
                                            name='name'
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Name</TableHeadings>
                                        <TableHeadings
                                            name='email'
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Email</TableHeadings>
                                        <th className='px-3 py-2'>created Date</th>

                                        <th className='px-3 py-2'>Actions</th>
                                    </tr>
                                    </thead>
                                    <thead
                                        className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full'
                                                       defualtValue={queryParams.name}
                                                       placeholder='User Name'
                                                       onBlur={e => searchFieldChanged('name', e.target.value)}
                                                       onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full'
                                                       defualtValue={queryParams.email}
                                                       placeholder='Email'
                                                       onBlur={e => searchFieldChanged('email', e.target.value)}
                                                       onKeyPress={e => onKeyPress('email', e)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.data.map((user) => (
                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                                            key={user.id}>
                                            <td className='px-3 py-3'>{user.id}</td>
                                            <td className='px-3 py-3 text-gray-100 text-nowrap'>{user.name}</td>
                                            <td className='px-3 py-3 '> {user.email}</td>
                                            <td className='px-3 py-3'>{user.created_at}</td>
                                            <td className='px-3 py-3 text-nowrap'>
                                                <Link href={route('user.edit', user.id)}
                                                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>
                                                    Edit
                                                </Link>
                                                <button onClick={e => DeleteUser(user)}
                                                      className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
            <Modal show={confirmingUserStoreModal} onClose={closeStoreModal}>
                <form onSubmit={storeUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Create a new User
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">

                    </p>

                    <div className='mt-4'>
                        <InputLabel
                            htmlFor='user_name'
                            value='User Name'
                        />
                        <TextInput
                            id='user_name'
                            type='text'
                            name='name'
                            value={data.name}
                            className='mt-1 block w-full'
                            isFocused={true}
                            onChange={e => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className='mt-2'/>
                    </div>
                    <div className='mt-4'>
                        <InputLabel
                            htmlFor='user_email'
                            value='Email'
                        />
                        <TextInput
                            id='user_email'
                            type='email'
                            name='email'
                            value={data.email}
                            className='mt-1 block w-full'
                            onChange={e => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className='mt-2'/>
                    </div>
                    <div className='mt-4'>
                        <InputLabel
                            htmlFor='user_password'
                            value='Password'
                        />
                        <TextInput
                            id='user_password'
                            type='password'
                            name='password'
                            value={data.password}
                            className='mt-1 block w-full'
                            onChange={e => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className='mt-2'/>
                    </div>
                    <div className='mt-4'>
                        <InputLabel
                            htmlFor='user_password_confirmation'
                            value='Confirm Password'
                        />
                        <TextInput
                            id='user_password_confirmation'
                            type='password'
                            name='password_confirmation'
                            value={data.password_confirmation}
                            className='mt-1 block w-full'
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} className='mt-2'/>
                    </div>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeStoreModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3 bg-green-600 focus:ring-green-500 hover:bg-green-500 active:bg-green-700" >
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
index.layout = (page) => <ParentLayout children={page}/>

export default index;
