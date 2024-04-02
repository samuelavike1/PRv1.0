import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import ParentLayout from "@/Layouts/ParentLayout.jsx";


// export default function Create({auth, users, project} ) {
const Create = ({auth, users, project} ) => {
    const {errors} = usePage().props;
    const {data, setData, post,reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: '',
        priority: '',
        assigned_user_id: '',
        project_id: '',

    })

    const onSubmit = (e) => {
        setData('project_id', project.id);
        e.preventDefault();
        post(route('task.store'))

    }
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create
                        Task</h2>
                </div>
            }>
            <Head title="Create Task"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/*<pre>{JSON.stringify(project.id,undefined,2)}</pre>*/}
                        <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                            {/*<div>*/}
                            {/*    <InputLabel*/}
                            {/*        htmlFor='task_image_path'*/}
                            {/*        value='Task Image'*/}
                            {/*    />*/}
                            {/*    <TextInput*/}
                            {/*        id='task_image_path'*/}
                            {/*        type='file'*/}
                            {/*        name='image'*/}
                            {/*        className='mt-1 block w-full'*/}
                            {/*        onChange={e => setData('image', e.target.files[0])}*/}
                            {/*    />*/}
                            {/*    <InputError message={errors.image} className='mt-2'/>*/}

                            {/*</div>*/}
                            <div className='grid gap-1 grid-cols-2 mt-2 gap-4'>
                                <div>
                                    <div className='mt-4'>
                                        <InputLabel
                                            htmlFor='task_name'
                                            value='Task Name'
                                        />
                                        <TextInput
                                            id='task_name'
                                            type='text'
                                            name='name'
                                            value={data.name}
                                            className='mt-1 block w-full'
                                            isFocused={true}
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className='mt-2'/>

                                    </div>
                                    <div className='mt-4 '>
                                        <InputLabel
                                            htmlFor='task_description'
                                            value='Task Description'
                                        />
                                        <TextAreaInput
                                            id='task_description'
                                            name='description'
                                            value={data.description}
                                            className='mt-1 block w-full'
                                            onChange={e => setData('description', e.target.value)}
                                            rows={8}
                                        />
                                        <InputError message={errors.description} className='mt-2'/>

                                    </div>
                                </div>
                                <div>
                                    <div className='mt-4'>
                                        <InputLabel
                                            htmlFor='task_due_date'
                                            value='Task Deadline'
                                        />
                                        <TextInput
                                            id='task_due_date'
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
                                            htmlFor='task_status'
                                            value='Task Status'
                                        />
                                        <SelectInput
                                            id='task_status'
                                            // name='status'
                                            className='mt-1 block w-full'
                                            onChange={e => setData('status', e.target.value)}
                                        >
                                            <option value=''>Task Status</option>
                                            <option value='pending'> Pending</option>
                                            <option value='in_progress'>In Progress</option>
                                            <option value='completed'>Completed</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className='mt-2'/>
                                    </div>
                                    <div className='mt-4'>
                                        <InputLabel
                                            htmlFor='task_priority'
                                            value='Task Priority'
                                        />
                                        <SelectInput
                                            id='task_priority'
                                            // name='priority'
                                            className='mt-1 block w-full'
                                            onChange={e => setData('priority', e.target.value)}
                                        >
                                            <option value=''>Priority</option>
                                            <option value='low'> Low</option>
                                            <option value='medium'>Medium</option>
                                            <option value='high'>High</option>
                                        </SelectInput>
                                        <InputError message={errors.priority} className='mt-2'/>
                                    </div>
                                    <div className='mt-4'>
                                        <InputLabel
                                            htmlFor='task_assigned_user'
                                            value='Assigned User'
                                        />
                                        <SelectInput
                                            id='assigned_user_id'
                                            // name='task_assigned_user'
                                            className='mt-1 block w-full'
                                            onChange={e => setData('assigned_user_id', e.target.value)}
                                        >
                                            <option value=''>Select User</option>
                                            {users.data.map((users) => (
                                                <option key={users.id} value={users.id}>{users.name}</option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.assigned_user_id} className='mt-2'/>
                                    </div>
                                </div>
                            </div>


                            <div className='mt-4 text-right'>
                                <Link
                                    href={route('project.show', project.id)}
                                    className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'
                                >Cancel</Link>
                                <button
                                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:border-r-emerald-600'>Submit
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </Authenticated>
    )
}

Create.layout = (page) => <ParentLayout children={page}/>

export default Create;
