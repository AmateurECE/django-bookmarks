###############################################################################
# NAME:		    Makefile
#
# AUTHOR:	    Ethan D. Twardy <edtwardy@mtu.edu>
#
# DESCRIPTION:	    The default rule for the website hosts this website using
#		    the nginx Docker base image on localhost:8080
#
# CREATED:	    04/20/2020
#
# LAST EDITED:	    07/03/2020
###

sourceDir=$(shell realpath .)
nginxConf=$(shell realpath .)/development-site.conf
containerName=bookmarks
networkName=nginx-net
rootDirectory=/var/www/website.com

docker:
	python3 ../manage.py runserver &
	sleep 3
	wget "localhost:8000/bookmarks/" -O testIndex.html
	kill -9 `lsof -i -P -n | grep '8000' | awk '{print $$2}' | head -1`
	docker run -d --rm --name $(containerName) -p "8080:80" \
		--network $(networkName) \
		-v "$(sourceDir):$(rootDirectory):ro" \
		-v "$(nginxConf):/etc/nginx/conf.d/default.conf:ro"\
		-v "`realpath .`/log:/var/log/nginx" \
		nginx:latest

###############################################################################
