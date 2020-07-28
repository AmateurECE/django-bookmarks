###############################################################################
# NAME:             serializers.py
#
# AUTHOR:           Ethan D. Twardy <edtwardy@mtu.edu>
#
# DESCRIPTION:      Serializers for user models to interface with DRF
#
# CREATED:          07/28/2020
#
# LAST EDITED:      07/28/2020
###

from rest_framework import serializers

from .models import Bookmark, Folder

class BookmarkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['url', 'pageLink', 'pageTitle', 'thumbnail', 'folder']

class FolderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Folder
        fields = ['url', 'name']

###############################################################################
