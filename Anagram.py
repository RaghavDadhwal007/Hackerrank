#!/bin/python3

import math
import os
import random
import re
import sys
from collections import Counter

# Complete the anagram function below.
def anagram(s):
    if len(s)%2 == 1:
        return -1
    
    res = 0
    
    cnt1 = Counter(s[:len(s)//2])
    cnt2 = Counter(s[len(s)//2:])
    cnt3 = {}
    
    for let, val in cnt1.items():
        cnt3[let] = abs(val - cnt2[let])
    for let, val in cnt2.items():
        cnt3[let] = abs(val - cnt1[let])
        
    for el in cnt3.values():
        res += el
    
    return res//2

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        s = input()

        result = anagram(s)

        fptr.write(str(result) + '\n')

    fptr.close()
