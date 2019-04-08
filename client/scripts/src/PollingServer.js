


class PollingServer{
    constructor(data){
        this.data
    }
    dispaly(){
        console.log("hello from Server")
    }

    call(){
        // # Data: Current_Time, current_server_wake_time, server_capacity, server_period
        // # Result: elected: a task
        // # begin
        // #     if Current_Time >= current_server_wake_time and
        // #     Current_Time < current_server_wake_time + server_capacity then
        // #         if There is a pending aperiodic request then
        // #             elected := aperiodic_task;
        // #         else
        // #             current_server_wake_time := current_server_wake_time + server_period;
        // #             if There is a pending periodic task then
        // #                 elected := periodic_task;
        // #         end
        // #     end
        // #     else
        // #         if There is a pending periodic task then
        // #             elected := periodic_task;
        // #         end
        // #     end
        // # end

    }
}