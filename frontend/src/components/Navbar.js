import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import InicioSesion from "./inicioSesion";

const navLinks = [
  { to: "/historia",  label: "HISTORIA" },
  { to: "/presentaciones", label: "PRESENTACIONES" },
  { to: "/",         label: "INICIO" },
  { to: "/empresas", label: "EMPRESAS" },
  { to: "/contacto", label: "CONTACTO" }
];


