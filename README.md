# Project Title

HermeSpeech Recorder is a user-friendly and
open-source platform designed to record speech from a
large cohort of participants.

## Description

HermeSpeech Recorder is a user-friendly and
open-source platform designed to record speech from a
large cohort of participants. The platform allows users
to easily initiate, pause, and stop recordings of their
assigned scripts or speech tasks. The completed speech
recordings are encrypted and stored in a cloud service,
complying with HIPAA regulations for data privacy, if
needed. The resulting files are uploaded asynchronously
to enable recordings in areas with low connectivity. The
platform also provides features for administrators to
easily create new participants, load and manage many scripts at once and assign tasks to participants, simpli-
fying the management of large cohorts, and making it a streamlined solution for remote speech recording in
a HIPAA compliant and efficient manner. Finally, we
describe our experience recording a group of participants
with atypical speech using this open-source tool.

## Getting Started

### Dependencies

* TODO

### Installing

* For our web-deployed version for the Johns Hopkins University & Medical Institute, please visit https://hermespeech.wse.jhu.edu/.
* For local installations, please follow the instructions below:
  1. Clone your desired version of this AtypicalSpeech repository. On your local terminal, please run something along the lines of ```git clone https://github.com/forrestpark/AtypicalSpeech.git```
  2. Install necessary packages and libraries to run the cloned repository, one pack for server side code and another for client side. To do this, from the repository’s root folder AtypicalSpeech, please run `npm install` and `cd client && npm install`.
  3. Download and install MySQL for our server side code and database to work. Please download MySQL and MySQL Workbench, respectively, from the following links:
     * MySQL: https://dev.mysql.com/downloads/mysql/
     * MySQL Workbench: https://dev.mysql.com/downloads/workbench/
     While you’re downloading and installing MySQL, you will be asked to create a root account. Please create a root account using root as the ID and use a password of your choice. Make sure you update the password on line 4 of [config/config.json](https://github.com/maxzinkus/AtypicalSpeech/blob/master/config/config.json) after you create an account so that the code’s credentials match with your MySQL’s credentials.
  4. Once you have MySQL and MySQL Workbench downloaded, open MySQL Workbench, and create a new schema named `speech_db`. The name has to be exactly `speech_db` for the program to start.
  5. We’re done configuring! To start the program on your local environment, please run the following commands from the root folder `AtypicalSpeech`:
     * `npm start`
     * `cd client && npm start`
  6. You should now be able to open the main entry point and dashboard via http://localhost:3001 and the admin dashboard via http://localhost:3001/admin

## Help

Please contact our team at jpark278@jhu.edu, jhuan185@jhu.edu, or laureano@jhu.edu.

## Authors

Jang Woo Park 
[@forrestpark](https://github.com/forrestpark)

Jim Huang
[@ameriania](https://github.com/ameriania)

Laureano Moro Velazquez

Max Zinkus

## Version History

* 0.1
    * Initial Release

## License

This project ~~ description

## Acknowledgments
