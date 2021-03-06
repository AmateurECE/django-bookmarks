import setuptools

with open('README.md', 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name='django-bookmarks',
    version='2.0',
    author='Ethan D. Twardy',
    author_email='ethan.twardy@gmail.com',
    description='Django application for creating and storing bookmarks',
    long_description=long_description,
    long_description_content_type='text/markdown',
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3.5+",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.5',
    install_requires=[
        'django',
        'djangorestframework',
        'Pillow',
    ],
    provides=['django_bookmarks'],
    include_package_data=True,
)
