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
USERS_RANGE = "A:D"
USERS_SHEET_RANGE = USERS_SHEET_NAME + "!" + USERS_RANGE

USER_GROUPS = "User Groups"
USER_GROUPS_RANGE = "A:C"
USER_GROUPS_SHEET_RANGE = USER_GROUPS + "!" + USER_GROUPS_RANGE

USER_BOOKS_SHEET_NAME = "Users and Books table"
USER_BOOKS_RANGE = "A:E"
USER_BOOKS_SHEET_RANGE = USER_BOOKS_SHEET_NAME + "!" + USER_BOOKS_RANGE

USER_NOTES_SHEET_NAME = "Users and Notes"
USER_NOTES_RANGE = "A:D"
USER_NOTES_SHEET_RANGE = USER_NOTES_SHEET_NAME + "!" + USER_NOTES_RANGE

RATING_SHEET_NAME = "Ratings Table"
RATING_RANGE = "A:D"
RATING_SHEET_RANGE = RATING_SHEET_NAME + "!" + RATING_RANGE

USER_IN_GROUPS = "Users in Groups table"
USER_IN_GROUPS_RANGE = "A:B"
USER_IN_GROUPS_SHEET_RANGE = USER_IN_GROUPS + "!" + USER_IN_GROUPS_RANGE

BOOKSTORE = "Books and Bookstore Table"
BOOKSTORE_RANGE = "A:C"
BOOKSTORE_SHEET_RANGE = BOOKSTORE + "!" + BOOKSTORE_RANGE

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
    elif domain == 'groups':
        range_name = USER_GROUPS_SHEET_RANGE
    elif domain == 'user_books':
        range_name = USER_BOOKS_SHEET_RANGE
    elif domain == 'notes':
        range_name = USER_NOTES_SHEET_RANGE
    elif domain == 'ratings':
        range_name = RATING_SHEET_RANGE
    elif domain == 'user_groups':
        range_name = USER_IN_GROUPS_SHEET_RANGE
    elif domain == 'bookstore':
        range_name = BOOKSTORE_SHEET_RANGE
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

def insert_values(domain, list_values, creds):
    if domain == 'users':
        range_name = USERS_SHEET_RANGE
    elif domain == 'books':
        range_name = BOOKS_SHEET_RANGE
    elif domain == 'groups':
        range_name = USER_GROUPS_SHEET_RANGE
    elif domain == 'user_books':
        range_name = USER_BOOKS_SHEET_RANGE
    elif domain == 'notes':
        range_name = USER_NOTES_SHEET_RANGE
    elif domain == 'ratings':
        range_name = RATING_SHEET_RANGE
    elif domain == 'user_groups':
        range_name = USER_IN_GROUPS_SHEET_RANGE
    elif domain == 'bookstore':
        range_name = BOOKSTORE_SHEET_RANGE
    else:
        return {}

    try:
        service = build('sheets', 'v4', credentials=creds)

    except:
        return

    range_ = range_name

    # How the input data should be interpreted.
    value_input_option = "USER_ENTERED"

    # list = [["book1"], ["book2"], ["book3"]]
    value_range_body = {
        "majorDimension": "ROWS",
        "values": list_values
    }

    request = service.spreadsheets().values().append(spreadsheetId=SPREADSHEET_ID, range=range_,
                                                     valueInputOption=value_input_option,
                                                     body=value_range_body)
    response = request.execute()

    print(response)