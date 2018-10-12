import os, sys, time

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)) + '/Notebook-generator')
sys.path.insert(1, os.path.dirname(os.path.realpath(__file__)) + '/Page-generator')
sys.path.insert(2, os.path.dirname(os.path.realpath(__file__)) + '/ELabJournal-entry-receiver')
sys.path.insert(3, os.path.dirname(os.path.realpath(__file__)) + '/GoogleDrive-entry-receiver')
sys.path.insert(4, os.path.dirname(os.path.realpath(__file__)) + '/iGEM-wiki-api-python')

from notebookGenerator import NotebookGenerator
from pageGenerator import PageGenerator
from getHardwareEntries import GetHardwareEntries as hardwareEntries
from receiver import GetELabEntries as labEntries
# from iGEMAPI import iGEMWIKI

def __main__():
	# Get working directories
	dirname  = os.path.dirname

	_dirpath = dirname(dirname(os.path.realpath(__file__))) + '/www/'
	_apppath = dirname(dirname(os.path.realpath(__file__))) + '/app/'
	_libpath = dirname(os.path.realpath(__file__)) + '/lib/'

	_html = _dirpath + 'html/'
	_outputhtml = _dirpath + 'generated html/'
	_notebookfiles = _libpath + 'notebook files/'
	
	# Get entries
	entries = []
	entries.append(hardwareEntries(_libpath))
	entries.append(labEntries(_libpath))

	# Generate notebook
	start = time.time()
	print('Generating notebook page...')
	NotebookGenerator(entries, _html, _notebookfiles).GeneratePage()
	end = time.time()
	print('Generated notebook page [{0}ms]'.format(int((end-start) * 1000)))
	
	# Generate pages
	start = time.time()
	print('Writing pages...')
	PageGenerator(_html, _outputhtml).GeneratePages()
	end = time.time()
	print('All pages written [{0}ms]'.format(int((end-start) * 1000)))

	# Upload all files to the wiki
	
	# username = input('Enter your iGEM username: ')
	# uploader = iGEMWIKI(2018, 'Rotterdam_HR', username)

	# for page in os.listdir(_outputhtml):
	# 	with open(_outputhtml + page) as f:
	# 		data = f.read()
	# 		uploader.updatePage('team', page.replace('.html', ''), data)

	# jsuploader = _apppath + 'Page-uploader-master/uploader.js'
	# response = muterun_js(jsuploader)
	# if response.exitcode == 0:
	# 	print(response.stdout)
	# else:
	# 	print(response.stderr)

# init
if __name__ == '__main__':
	__main__()
