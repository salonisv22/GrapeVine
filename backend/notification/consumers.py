import json
from grapevine.settings import SECRET_KEY
from channels.generic.websocket import AsyncWebsocketConsumer
import jwt
from django.http import JsonResponse

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        for header_set in self.scope['headers']:
            if b'cookie' in header_set:
                refresh = next((x for x in header_set if x.startswith(b'refresh')),None).decode().split(";")[0][8:]
                user = jwt.decode(refresh, SECRET_KEY ,algorithms= ['HS256',])['user_id']
            
        self.group_name = user
        print(user+"consumer")

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #     username = text_data_json['username']

    #     await self.channel_layer.group_send(
    #         self.group_name,
    #         {
    #             'type': 'chatroom_message',
    #             'message': message,
    #             'username': username,
    #         }
    #     )

    async def send_notification(self, event):
        data = event['data']
        print("socket")
        print(data)
        data['sender'] = str(data['sender'])
        data['user'] = str(data['user'])
        await self.send(text_data=json.dumps(data))