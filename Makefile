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
# LAST EDITED:	    08/01/2021
###

sourceDir=$(shell realpath .)
nginxConf=$(shell realpath .)/development-site.conf
containerName=bookmarks
networkName=nginx-net
rootDirectory=/var/www/website.com

dist: dist/django_bookmarks-1.0-py3-none-any.whl

bundle = bookmarks/static/bookmarks/js/bundle.js

bundle-deps = \
	$(shell find js) \
	webpack-static.config.js \
	package.json \
	package-lock.json

$(bundle): $(bundle-deps)
	npx webpack --config webpack-static.config.js

bdist-deps = \
	$(shell find bookmarks) \
	setup.py \
	MANIFEST.in \
	$(bundle)

dist/django_bookmarks-1.0-py3-none-any.whl: $(bdist-deps)
	python3 setup.py sdist
	python3 setup.py bdist_wheel

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
