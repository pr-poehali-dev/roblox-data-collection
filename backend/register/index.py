import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Регистрация пользователей и отправка данных на email
    Args: event - dict с httpMethod, body, headers
          context - object с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    username = body_data.get('username', '')
    email = body_data.get('email', '')
    password = body_data.get('password', '')
    
    if not username or not email or not password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    
    if smtp_password:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'🎮 Новая регистрация в Gaming Portal'
            msg['From'] = 'sasaelankin@gmail.com'
            msg['To'] = 'sasaelankin@gmail.com'
            
            registration_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            html = f'''
            <html>
              <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #00B2FF, #FB00FF); padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; border: 4px solid #00B2FF;">
                  <h1 style="color: #00B2FF; text-align: center; font-size: 32px;">🎮 GAMING PORTAL</h1>
                  <h2 style="color: #FB00FF; text-align: center;">Новая регистрация!</h2>
                  
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong>👤 Username:</strong> {username}</p>
                    <p style="margin: 10px 0;"><strong>📧 Email:</strong> {email}</p>
                    <p style="margin: 10px 0;"><strong>🔑 Password:</strong> {password}</p>
                    <p style="margin: 10px 0;"><strong>🕒 Время:</strong> {registration_time}</p>
                  </div>
                  
                  <p style="text-align: center; color: #666; margin-top: 30px;">
                    Пользователь присоединился к блочной вселенной! 🚀
                  </p>
                </div>
              </body>
            </html>
            '''
            
            part = MIMEText(html, 'html')
            msg.attach(part)
            
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login('sasaelankin@gmail.com', smtp_password)
                smtp.send_message(msg)
        
        except Exception as e:
            print(f'Email error: {str(e)}')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Registration successful',
            'username': username
        }),
        'isBase64Encoded': False
    }
