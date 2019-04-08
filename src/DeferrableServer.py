from .AbstractServer import AbstractServer as Server


class DeferrableServer(Server):
    def __init__(self, budget, **kargs):
        super(DeferrableServer, self).__init__(budget, **kargs)

    def call(self, inputs):
        pass
        # Data: Current_T ime, current_server_capacity, current_server_wake_time,
        # server_capacity, server_period
        # Result: elected: a task
        # begin
        #     /* Refill the server’s capacity and compute the next wake time */
        #     if Current_T ime = current_server_wake_time then
        #         current_server_capacity := server_capacity;
        #         current_server_wake_time := current_server_wake_time + server_period;
        #     end
        #     /* Election */
        #     if current_server_capacity > 0 and there is a pending aperiodic task then
        #         elected := aperiodic_task;
        #         current_server_capacity := current_server_capacity - 1;
        #     else
        #         if There is a pending periodic task then
        #             elected := periodic_task;
        #         end
        #     end
        # end
