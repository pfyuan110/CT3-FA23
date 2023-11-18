using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FaceToMouse : MonoBehaviour
{
    public bool isActive = false;

    void Update()
    {       
        if(isActive)
        {
            transform.LookAt(Camera.main.ScreenToWorldPoint(Input.mousePosition));
        }
    }
   
}
