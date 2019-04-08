from .AbstractServer import AbstractServer as Server


class SporadicServer(Server):
    def __init__(self, budget, **kargs):
        super(SporadicServer, self).__init__(budget, **kargs)

    def call(self, inputs):
        pass
        # Data: Current_Time, current_server_capacity, current_server_wake_time,
        # server_is_idle, server_capacity, server_period
        # Result: elected: a task
        # begin
        #     /* Refill the server’s capacity and put it back into idle mode */
        #     if Current_Time = current_server_wake_time then
        #         current_server_capacity := server_capacity;
        #         server_is_idle := True;
        #     end
        #     /* Election */
        #     if current_server_capacity > 0 and there is a pending aperiodic task then
        #         elected := aperiodic_task;
        #         current_server_capacity := current_server_capacity - 1;
        #         if server_is_idle = True then
        #             server_is_idle := False;
        #             current_server_wake_time := Current_Time + server_period;
        #         end
        #     else
        #         if There is a pending periodic task then
        #             elected := periodic_task;
        #         end
        #     end
        # end