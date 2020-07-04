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

    @staticmethod
    def _verifyFolders(folderObjects, responseObject):
        for folder in folderObjects:
            found = False
            for comparator in responseObject:
                if comparator['name'] == folder.name:
                    found = True
                    break
            if not found:
                return found
        return True

    def testGetAllFolders(self):
        numberOfFolders = len(Folder.objects.all())
        response = json.loads(self.client.get(reverse('api-folders')).content)
        self.assertEqual(numberOfFolders, len(response))
        self._verifyFolders(Folder.objects.all(), response)

        newFolder = Folder(name='Test Folder One')
        newFolder.save()
        numberOfFolders += 1
        self.assertEqual(len(Folder.objects.all()), numberOfFolders)
        response = json.loads(self.client.get(reverse('api-folders')).content)
        self.assertEqual(numberOfFolders, len(response))
        self._verifyFolders(Folder.objects.all(), response)

        newFolder = Folder(name='Test Folder Two')
        newFolder.save()
        numberOfFolders += 1
        self.assertEqual(len(Folder.objects.all()), numberOfFolders)
        response = json.loads(self.client.get(reverse('api-folders')).content)
        self.assertEqual(numberOfFolders, len(response))
        self._verifyFolders(Folder.objects.all(), response)

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

class BookmarkViewTests(TestCase):
    def setUp(self):
        self.testFolder = {'name': 'TestFolder'}
        self.testFolderInstance = Folder(name=self.testFolder['name'])
        self.testFolderInstance.save()

    def testDeleteBookmark(self):
        testBookmarkId = 1 # The test database should be empty
        # Verify that the test database is empty, so that the id of 1 works
        self.assertRaises(Bookmark.DoesNotExist, Bookmark.objects.get,
                          pk=testBookmarkId)
        response = self.client.delete(
            reverse('api-bookmark', kwargs={'bookmarkId': testBookmarkId}))

        # Attempting to delete a bookmark that does not exist returns 404
        self.assertEquals(response.status_code, 404)

        testBookmark = Bookmark(
            pageTitle='Google', pageLink='https://www.google.com',
            folder=self.testFolderInstance)
        testBookmark.save()
        self.assertEquals(testBookmark.pk, testBookmarkId)
        response = self.client.delete(
            reverse('api-bookmark', kwargs={'bookmarkId': testBookmarkId}))
        self.assertEquals(response.status_code, 200)

        # Ensure the bookmark was deleted.
        self.assertRaises(Bookmark.DoesNotExist, Bookmark.objects.get,
                          pk=testBookmarkId)
