import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP} from "@/Constants.jsx";

import ParentLayout from "@/Layouts/ParentLayout.jsx";
import Create from "@/Pages/Task/Create.jsx";

const Show = ({auth, task})=>{

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {`Task "${task.name}"`}
            </h2>}
        >
            <Head title={`Task "${task.name}"`}/>

            <div className="pb-12 pt-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className='grid gap-1 grid-cols-2 mt-2'>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg mt-2'>Task ID : {task.id}</label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Title</label>
                                        <p className='mt-1'>{task.name}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Status</label>
                                        <p>
                                            <span
                                                className={'px-2 py-1 rounded text-white ' + PROJECT_STATUS_CLASS_MAP[task.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Created by : {task.createdBy.name}</label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Updated By : {task.updatedBy.name}</label>
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Task Priority</label>
                                        <p>
                                            <span
                                                className={'px-2 py-1 rounded text-white ' + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Date Created</label>
                                        <p className='mt-1'>{task.created_at}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{task.due_date}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Assigned To</label>
                                        <p className='mt-1'>{task.assignedTo.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label className='font-bold text-lg'>Description</label>
                                <p className='mt-1'>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Authenticated>
    )
}

Show.layout = (page) => <ParentLayout children={page}/>

export default Show;

