from channels.generic.websocket import AsyncJsonWebsocketConsumer

import json
from random import randint
from time import sleep

class WSConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.accept()
        print("accept")
    
    async def notify(self, event):
        print(self, event)