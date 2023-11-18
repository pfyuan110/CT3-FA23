using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class SpawnControl : MonoBehaviour
{
    public GameObject[] guyPrefabs;
    public Transform guyParent;
    public int _gridNum = 10;
    public float gridGap = 1.5f;

    public GameObject[,] guys;

    void Start()
    {
        _gridNum = PropertyControl.gridNum;
        guys = new GameObject[_gridNum, _gridNum];
        SpawnGrid();
    }

    void SpawnGrid()
    {
        for (int x = 0; x < _gridNum; x++)
        {
            for (int z = 0; z < _gridNum; z++)
            {
                Vector3 spawnPosition = new Vector3(x * gridGap - (_gridNum * 1/2 * gridGap), 0, z * gridGap - (_gridNum * 1/2 * gridGap));
                GameObject clone = Instantiate(guyPrefabs[Random.Range(0, guyPrefabs.Length)], spawnPosition, Quaternion.identity);
                clone.transform.parent = guyParent;
                //clone.gameObject.tag = "guys";
                guys[x,z] = clone;
            }
        }
    }
}
