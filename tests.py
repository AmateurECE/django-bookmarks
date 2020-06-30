from django.test import TestCase
from django.urls import reverse
import json
from .models import Folder, Bookmark

# Create your tests here.
class FolderCollectionViewTests(TestCase):
    def testCreateFolder(self):
        postData = {'name': 'TestFolder'}
        # First, make sure the test folder does not already exist
        self.assertRaises(Folder.DoesNotExist, Folder.objects.get,
                          name=postData['name'])
        # Do request
        response = self.client.post(reverse('api-folders'),
                                    json.dumps(postData),
                                    content_type='text/json')
        # Verify response
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response['content-type'], 'text/json')
        responseData = json.loads(response.content)
        self.assertEquals(responseData['id'], 1)
        self.assertEquals(responseData['name'], postData['name'])
        # Verify object was created
        createdObject = Folder.objects.get(pk=1)
        self.assertEquals(createdObject.name, postData['name'])

class BookmarkCollectionViewTests(TestCase):
    def setUp(self):
        self.testFolder = {'name': 'TestFolder'}
        self.client.post(reverse('api-folders'), json.dumps(self.testFolder),
                         content_type='text/json')

    def testCreateBookmark(self):
        bookmarkData = {
            'pageTitle': 'Google',
            'pageLink': 'https://www.google.com',
            'folder': self.testFolder['name']
        }
        # First, make sure the bookmark does not already exist
        self.assertRaises(Bookmark.DoesNotExist, Bookmark.objects.get,
                          pageTitle=bookmarkData['pageTitle'])
        # Create the bookmark
        response = self.client.post(reverse('api-bookmarks'),
                                    json.dumps(bookmarkData),
                                    content_type='text/json')
        # Verify the response
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response['content-type'], 'text/json')
        responseData = json.loads(response.content)
        self.assertEquals(responseData['id'], 1)
        self.assertEquals(responseData['pageTitle'], bookmarkData['pageTitle'])
        self.assertEquals(responseData['pageLink'], bookmarkData['pageLink'])
        self.assertEquals(responseData['folder'], self.testFolder['name'])
        # Verify the object was created
        createdBookmark = Bookmark.objects.get(pk=1)
        self.assertEquals(createdBookmark.pageTitle, bookmarkData['pageTitle'])
        self.assertEquals(createdBookmark.pageLink, bookmarkData['pageLink'])
        createdTestFolder = Folder.objects.get(name=self.testFolder['name'])
        self.assertEquals(createdBookmark.folder, createdTestFolder)
