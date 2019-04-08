class AbstractServer(object):
    def __init__(self, budget):
        pass
    def __call__(self, inputs):
        self.call(inputs)

    def call(self, inputs=None):
        raise NotImplementedError