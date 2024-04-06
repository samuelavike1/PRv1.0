import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable.jsx";
import ParentLayout from "@/Layouts/ParentLayout.jsx";
import Create from "@/Pages/Task/Create.jsx";

const index = ({auth, tasks, queryParams=null}) =>{
    queryParams = queryParams || {}


    return(
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} queryParams={queryParams}/>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}
index.layout = (page) => <ParentLayout children={page}/>

export default index;
