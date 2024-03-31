import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";


export default function Create({auth, project} ) {
    const {data, setData,post ,errors,reset} = useForm({
        image: '',
        name: project.name || '',
        status: project.status || '',
        description: project.description || '',
        due_date: project.due_date || '',
        _method: 'PUT',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('project.update', project.id))
    }
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Project "{project.name}"</h2>
                </div>
            }>
            <Head title="Create Project"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                            <div>
                                {project.image_path &&
                                    <div className='mb-4'>
                                        <img src={project.image_path} className='w-20' />
                                    </div>
                                }
                                <InputLabel
                                    htmlFor='project_image_path'
                                    value='Project Image'
                                />
                                <TextInput
                                    id='project_image_path'
                                    type='file'
                                    name='image'
                                    className='mt-1 block w-full'
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className='mt-2'/>

                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor='project_name'
                                    value='Project Name'
                                />
                                <TextInput
                                    id='project_name'
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
                                    htmlFor='project_description'
                                    value='Project Description'
                                />
                                <TextAreaInput
                                    id='project_description'
                                    name='description'
                                    value={data.description}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className='mt-2'/>

                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor='project_due_date'
                                    value='Due Date'
                                />
                                <TextInput
                                    id='project_due_date'
                                    type='date'
                                    name='due_date'
                                    value={data.due_date}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className='mt-2'/>

                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor='project_status'
                                    value='Project Status'
                                />
                                <SelectInput
                                    id='project_status'
                                    name='status'
                                     className='mt-1 block w-full'
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value=''></option>
                                    <option value='pending'> Pending</option>
                                    <option value='in_progress'>In Progress</option>
                                    <option value='completed'>Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className='mt-2'/>
                            </div>
                            <div className='mt-4 text-right'>
                                <Link
                                    href={route('project.index')}
                                    className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'
                                >Cancel</Link>
                                <button className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:border-r-emerald-600'>Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </Authenticated>
    )
}
