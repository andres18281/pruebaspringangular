package com.bolsadeideas.springboot.backend.apirest.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolsadeideas.springboot.backend.apirest.models.dao.IClienteDao;
import com.bolsadeideas.springboot.backend.apirest.models.dao.IRolDao;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Rol;
@Service
public class RolServiceImpl implements IRolService{
	
	@Autowired
	private IRolDao rolDao;
	@Override
	public Rol findById(Integer idrol) {
		// TODO Auto-generated method stub
		return rolDao.findById(idrol).orElse(null);
	}

}
