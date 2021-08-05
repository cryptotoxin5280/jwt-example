#!/usr/bin/python3

""" ut_template.py """

import unittest
import requests

class TestDemo(unittest.TestCase):
  """ Demo API Test Class """
  
  @classmethod
  def setUpClass(cls):
    """ Sets defaults """
    cls.api_url = 'http://localhost:4000/api/v1/demos'

  def test_001_post(self):
    """ Tests CREATE """
    pass

  def test_002_get(self):
    """ Tests RETRIEVE """
    pass

  def test_003_update(self):
    """ Tests UPDATE """
    pass

  def test_004_delete(self):
    """ Tests DELETE """
    pass

