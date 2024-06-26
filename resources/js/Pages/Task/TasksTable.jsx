import TableHeadings from "@/Components/TableHeadings.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/Constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, queryParams = null, hideProjectColumn = false}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name]=value;
        }else{
            delete queryParams[name];
        }
        router.get(route('task.index'), queryParams);
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
        router.get(route('task.index'), queryParams);
    };
    // const DeleteProject = (task) => {
    //     if(!window.confirm('Are you sure you want to delete this project?')) {
    //         return;
    //     }
    //     router.delete(route('task.destroy',task.id))
    // };

    return(
        <>

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
                        >Task Title</TableHeadings>
                        <th className='px-3 py-2'>Assign To</th>
                        {!hideProjectColumn && (
                            <th className='px-3 py-2'>Project Name</th>
                        )}
                        <TableHeadings
                            name='status'
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >Status</TableHeadings>
                        <th className='px-3 py-2'>created Date</th>
                        <TableHeadings
                            name='due_date'
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >Due Date</TableHeadings>
                        <th className='px-3 py-2'>Created By</th>
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
                                       placeholder='Task Name'
                                       onBlur={e => searchFieldChanged('name', e.target.value)}
                                       onKeyPress={e => onKeyPress('name', e)}
                            />
                        </th>
                        <th className='px-3 py-2'></th>
                        {!hideProjectColumn && (
                            <th className='px-3 py-2'></th>
                        )}
                        <th className='px-3 py-2'>
                            <SelectInput className='w-full'
                                         onChange={(e) => searchFieldChanged('status', e.target.value)}
                                         defualtValue={queryParams.status}
                            >
                                <option value=''>Select Status</option>
                                <option value='pending'>Pending</option>
                                <option value='in_progress'>In Progress</option>
                                <option value='completed'>Completed</option>
                            </SelectInput>
                        </th>
                        <th className='px-3 py-2'></th>
                        <th className='px-3 py-2'></th>
                        <th className='px-3 py-2 '></th>
                        <th className='px-3 py-2'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.data.map((task) => (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            key={task.id}>
                            <td className='px-3 py-3'>{task.id}</td>

                            <td className='px-3 py-3'>
                                <Link href={route('task.show', task.id)}
                                      className=' dark:text-white text-nowrap hover:underline hover:text-blue-500'>
                                    {task.name}
                                </Link>
                            </td>
                            <td className='px-3 py-3'>{task.assignedTo.name}</td>
                            {!hideProjectColumn && (
                                <td className='px-3 py-3'>{task.project.name}</td>
                            )}
                            <td className='px-3 py-3 '>
                                            <span
                                                className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status]}>{
                                                TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                            </td>
                            <td className='px-3 py-3'>{task.created_at}</td>
                            <td className='px-3 py-3'>{task.due_date}</td>
                            <td className='px-3 py-3 text-nowrap'>{task.createdBy.name}</td>
                            <td className='px-3 py-3'>
                                <Link href={route('task.edit', task.id)}
                                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>
                                    Edit
                                </Link>
                                <Link href={route('delete-task', task.id)}
                                      className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links}/>
        </>
    )

}
