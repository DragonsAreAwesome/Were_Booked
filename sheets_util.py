from __future__ import print_function

import os.path

import google
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

SPREADSHEET_ID = '1xd0-lBjAA936LT5wTVpFEkCo6ZIZy_nCdt-YaOj6nlI'

BOOKS_SHEET_NAME = "Books Table"
BOOKS_RANGE = "A:G"
BOOKS_SHEET_RANGE = BOOKS_SHEET_NAME + "!" + BOOKS_RANGE

USERS_SHEET_NAME = "Users Table"
USERS_RANGE = "A:C"
USERS_SHEET_RANGE = USERS_SHEET_NAME + "!" + USERS_RANGE


def authenticate_sheet():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return creds


def get_values(domain, creds):
    """
    Creates the batch_update the user has access to.
    Load pre-authorized user credentials from the environment.
    TODO(developer) - See https://developers.google.com/identity
    for guides on implementing OAuth2 for the application.
        """
    if domain == 'users':
        range_name = USERS_SHEET_RANGE
    elif domain == 'books':
        range_name = BOOKS_SHEET_RANGE
    else:
        return {}
    try:
        service = build('sheets', 'v4', credentials=creds)

        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID, range=range_name).execute()
        rows = result.get('values', [])
        print(f"{len(rows)} rows retrieved")
        return rows[1:]
    except HttpError as error:
        print(f"An error occurred: {error}")
        return error