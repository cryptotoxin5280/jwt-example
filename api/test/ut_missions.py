#!/usr/bin/python3

""" ut_missions.py """

import json
import unittest
import requests

class TestMissions(unittest.TestCase):
  """ Test Missions API """
  
  @classmethod
  def setUpClass(cls):
    """ Sets defaults """
    cls.headers = {'content-type': 'application/json'}
    cls.api_url = 'http://localhost:4000/api/v1/missions'

  def test_001_create(self):
    """ Tests creating a mission """
    body = {
      "type": "string",
      "lastUpdate": 0,
      "leashTimeout": 0,
      "avoidance": True,
      "boudningPolygon": "string",
      "minDepth": 0,
      "depthAvoidance": True,
      "seaKeeping": True,
      "caActivationDistance": 0
    }
    result = requests.post(
      self.api_url,
      json.dumps(body),
      headers=self.headers
    )
    self.assertEqual(result.status_code, 201)

  def test_002_get_all(self):
    """ Tests getting all missions """
    pass

  def test_003_delete_all(self):
    """ Tests deleting all missions """
    pass
  
  def test_002_get_one(self):
    """ Tests getting one mission """
    pass

  def test_004_delete_one(self):
    """ Tests deleting one mission """
    pass

  def test_004_execute(self):
    """ Tests executing a mission """
    pass

  def test_004_abort(self):
    """ Tests aborting the current mission """
    pass

  def test_004_pause(self):
    """ Tests pausing the current mission """
    pass

  def test_004_resume(self):
    """ Tests resuming the current mission """
    pass
