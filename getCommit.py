import subprocess

file_contents = []

# Capture short commit hash.

command_output = subprocess.Popen(["git","show","-s","--format=\"%h %ci\""], stdout=subprocess.PIPE)

#command_output = subprocess.Popen(["git","rev-parse","--short","HEAD"], stdout=subprocess.PIPE)

short_commit = command_output.communicate()[0].decode("utf-8").replace('\n','')

short_commit = short_commit[1:28]

# Define Laravel config file contents.
file_contents.append("<?php")
file_contents.append(" ")
file_contents.append("return [")
file_contents.append("    'commit' => '{0}'".format(short_commit))
file_contents.append("];")

# Write config file. 
f = open('config/git.php','w')
f.write('\n'.join(file_contents))
f.close()

